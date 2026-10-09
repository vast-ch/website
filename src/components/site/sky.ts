// Sky shader driving the full-screen background canvas (see SkyCanvas.astro).

// Horizon height (fraction of the viewport from the bottom) per page type.
// `home` must match --horizon in assets/styles/site.css.
const HORIZON = { home: 0.4, content: 0.28 } as const;
const MAX_FPS = 30;

const VERTEX = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform vec2 uRes;
  uniform float uTime;
  uniform float uNight;
  uniform float uHorizon;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = ROT * p * 2.03 + vec2(17.0, 9.0);
      a *= 0.5;
    }
    return v;
  }

  float fbm4(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = ROT * p * 2.03 + vec2(17.0, 9.0);
      a *= 0.5;
    }
    return v;
  }

  // Puffy "cauliflower" noise for cumulus tops.
  float billow(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * abs(noise(p) * 2.0 - 1.0);
      p = ROT * p * 2.03 + vec2(17.0, 9.0);
      a *= 0.5;
    }
    return v;
  }

  float cloudHeight(vec2 p) {
    return fbm4(p * 0.35) * 0.7 + billow(p * 1.1) * 0.7;
  }

  // Distant mountain profile, peaky like the Bernese Oberland.
  float ridge(float x) {
    float h = 0.0;
    float a = 0.6;
    float f = 1.6;
    for (int i = 0; i < 4; i++) {
      float n = 1.0 - abs(noise(vec2(x * f, 7.3 + float(i) * 13.1)) * 2.0 - 1.0);
      h += a * n * n;
      f *= 2.4;
      a *= 0.33;
    }
    return h;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    float x = (uv.x - 0.5) * aspect;
    float dy = uv.y - uHorizon;
    float t = uTime;
    float night = smoothstep(0.0, 1.0, uNight);

    vec3 haze = mix(vec3(0.912, 0.916, 0.921), vec3(0.150, 0.151, 0.162), night);
    vec3 zenith = mix(vec3(0.742, 0.760, 0.781), vec3(0.040, 0.042, 0.050), night);
    vec3 cloudLight = mix(vec3(0.990, 0.990, 0.988), vec3(0.330, 0.333, 0.352), night);
    vec3 cloudShadow = mix(vec3(0.660, 0.676, 0.700), vec3(0.062, 0.063, 0.072), night);

    vec3 col;

    if (dy > 0.0) {
      // Sky gradient.
      float skyT = clamp(dy / max(1.0 - uHorizon, 0.05), 0.0, 1.0);
      col = mix(haze, zenith, pow(skyT, 0.8));

      // High cloud deck seen from below, in perspective.
      float depth = 0.2 / (dy + 0.01);
      vec2 wp = vec2(x * depth, depth) * 0.8 + vec2(t * 0.004, t * 0.010);
      vec2 warp = vec2(fbm4(wp * 0.5 + t * 0.002), fbm4(wp * 0.5 + vec2(4.1, 1.7)));
      float c = fbm(wp + 0.7 * warp);
      float cover = smoothstep(0.52, 0.80, c) * exp(-depth * 0.035) * smoothstep(0.0, 0.08, dy);
      float underside = smoothstep(0.52, 0.95, c);
      vec3 highCloud = mix(
        mix(vec3(0.975, 0.977, 0.980), vec3(0.205, 0.206, 0.220), night),
        mix(vec3(0.840, 0.848, 0.860), vec3(0.120, 0.121, 0.132), night),
        underside * 0.6
      );
      col = mix(col, highCloud, cover * 0.75);

      // Stars, only through clear sky.
      vec2 sc = vec2(x, dy) * 230.0;
      vec2 cell = floor(sc);
      float r = hash(cell);
      if (r > 0.991) {
        float d = length(fract(sc) - 0.5);
        float twinkle = 0.55 + 0.45 * sin(t * (0.8 + r * 2.5) + r * 61.0);
        float star = smoothstep(0.42, 0.0, d) * twinkle * (0.35 + 0.65 * hash(cell + 7.0));
        col += star * night * (1.0 - cover) * smoothstep(0.02, 0.2, dy) * 0.85;
      }

      // Distant ridge rising above the sea of clouds.
      float rh = pow(max(ridge(x + 3.0) - 0.36, 0.0), 1.5) * 0.36;
      if (dy < rh) {
        float up = clamp(dy / max(rh, 0.001), 0.0, 1.0);
        vec3 rock = mix(vec3(0.700, 0.715, 0.740), vec3(0.070, 0.071, 0.080), night);
        vec3 snow = mix(vec3(0.965, 0.967, 0.970), vec3(0.230, 0.232, 0.248), night);
        float snowy = smoothstep(0.45, 0.8, up + 0.3 * (noise(vec2(x * 120.0, dy * 220.0)) - 0.5));
        vec3 m = mix(rock, snow, snowy * 0.8);
        // Aerial perspective: the base melts into the haze above the clouds.
        m = mix(m, haze, 0.3 + 0.55 * (1.0 - smoothstep(0.0, 0.7, up)));
        float edge = smoothstep(rh, rh - 0.002, dy);
        col = mix(col, m, edge);
      }
    } else {
      // Sea of clouds below the horizon, drifting slowly towards the viewer.
      float yy = -dy;
      float depth = 0.55 / (yy + 0.003);
      vec2 p = vec2(x * depth, depth) * 0.5 + vec2(t * 0.010, t * 0.028);
      vec2 warp = vec2(
        fbm4(p * 0.4 + vec2(0.0, t * 0.012)),
        fbm4(p * 0.4 + vec2(5.2, 1.3) - t * 0.009)
      );
      p += warp * 0.9;
      float h = cloudHeight(p);
      float hl = cloudHeight(p + vec2(-0.05, 0.05));
      float facing = clamp((h - hl) * 9.0 + 0.5, 0.0, 1.0);
      float body = smoothstep(0.5, 0.9, h);
      col = mix(cloudShadow, cloudLight, clamp(body * 0.5 + facing * 0.5, 0.0, 1.0));
      col *= mix(0.88, 1.0, smoothstep(0.35, 0.75, h));
      float fog = 1.0 - exp(-depth * 0.032);
      col = mix(col, haze, fog);
    }

    // Bright band where the clouds meet the sky.
    col += mix(0.03, 0.018, night) * exp(-abs(dy) * 40.0);

    // Paper grain.
    col += (hash(gl_FragCoord.xy + 0.5) - 0.5) * mix(0.035, 0.028, night);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[sky]', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function start(canvas: HTMLCanvasElement) {
  const root = document.documentElement;
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (!gl) return false;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return false;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, 'uRes');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uNight = gl.getUniformLocation(program, 'uNight');
  const uHorizon = gl.getUniformLocation(program, 'uHorizon');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isNight = () => (root.classList.contains('dark') ? 1 : 0);
  const horizonTarget = () => (root.dataset.page === 'home' ? HORIZON.home : HORIZON.content);

  let night = isNight();
  let horizon = horizonTarget();
  let time = 40;
  let last = performance.now();
  let lastDraw = 0;
  let frame = 0;
  let lost = false;

  const resize = () => {
    // Clouds are soft: render at a fraction of the CSS size and let it scale up.
    const scale = window.innerWidth < 768 ? 0.5 : 0.6;
    const width = Math.max(1, Math.round(canvas.clientWidth * scale));
    const height = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const draw = () => {
    resize();
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform1f(uNight, night);
    gl.uniform1f(uHorizon, horizon);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const settled = () => Math.abs(night - isNight()) < 0.001 && Math.abs(horizon - horizonTarget()) < 0.0005;

  const tick = (now: number) => {
    frame = 0;
    if (lost) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    if (reducedMotion.matches) {
      night = isNight();
      horizon = horizonTarget();
      draw();
      return; // Redrawn only when something changes.
    }

    if (now - lastDraw >= 1000 / MAX_FPS - 2) {
      lastDraw = now;
      time += dt;
      const ease = 1 - Math.exp(-dt * 4.5);
      night += (isNight() - night) * ease;
      horizon += (horizonTarget() - horizon) * (1 - Math.exp(-dt * 2.5));
      if (settled()) {
        night = isNight();
      }
      draw();
    } else {
      time += dt;
    }
    frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };

  new MutationObserver(wake).observe(root, { attributes: true, attributeFilter: ['class', 'data-page'] });
  window.addEventListener('resize', wake);
  reducedMotion.addEventListener('change', wake);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    root.classList.add('no-sky');
  });

  draw();
  canvas.classList.add('is-ready');
  wake();
  return true;
}

const canvas = document.getElementById('sky') as HTMLCanvasElement | null;
if (!canvas || !start(canvas)) {
  // Client-side navigation replaces <html> attributes, so restore the fallback flag.
  const fallback = () => document.documentElement.classList.add('no-sky');
  fallback();
  document.addEventListener('astro:after-swap', fallback);
}

export {};
