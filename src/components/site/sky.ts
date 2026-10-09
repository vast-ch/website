// Sky shader driving the full-screen background canvas (see SkyCanvas.astro).
//
// Below the horizon, every pixel casts a ray into a volumetric layer of cloud
// and accumulates its density front to back, with one extra sample towards the
// sun for self-shadowing. That is what gives the puffs real volume. Above the
// horizon, a cheap 2D sky with drifting high clouds and, at night, stars.

// Horizon height (fraction of the viewport from the bottom) per page type.
// `home` must match --horizon in assets/styles/site.css.
const HORIZON = { home: 0.4, content: 0.28 } as const;
const MAX_FPS = 30;

// Render at a fraction of the CSS size (clouds are soft), lowered further on
// devices that cannot keep up.
const SCALE = { desktop: 0.7, mobile: 0.6, min: 0.3 } as const;

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
  uniform sampler2D uNoise;

  const float CLOUD_TOP = -0.55;
  const float CLOUD_BOTTOM = -1.8;
  const float MAX_DISTANCE = 60.0;
  const vec3 SUN = vec3(-0.640, 0.533, 0.480);
  // Rotation between octaves, so the grid of the value noise never lines up.
  const mat3 ROT3 = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);

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

  // 3D value noise in one texture fetch: the green channel of uNoise is its red
  // channel shifted by (37, 239), so each texel holds two neighbouring z-slices.
  float noise3(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    vec2 uv = p.xy + vec2(37.0, 239.0) * p.z + f.xy;
    vec2 rg = texture2D(uNoise, (uv + 0.5) / 256.0).yx;
    return mix(rg.x, rg.y, f.z);
  }

  // Cloud density. Puffy noise whose tops undulate around y = -1, thickening
  // with depth so the sea of clouds is opaque underneath. Fewer octaves far away.
  // (The fourth octave reaches only 0.75: a full sum would be 0.94, not 1.)
  float density(vec3 p, int octaves) {
    vec3 q = p * 1.3 + vec3(0.03, 0.015, 0.08) * uTime;
    float f = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      if (i >= octaves) break;
      f += a * noise3(q);
      q = ROT3 * q * 2.03;
      a *= 0.5;
    }
    return clamp(5.0 * f - 2.15 - (p.y + 1.0) * 5.0, 0.0, 1.0);
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
    } else {
      // Sea of clouds: march a ray from a camera floating above the layer. The
      // projection is shifted so that the horizon lands exactly on uHorizon.
      vec3 rd = normalize(vec3(x, dy, 1.25));

      vec3 lit = mix(vec3(1.0, 1.0, 1.0), vec3(0.300, 0.302, 0.325), night);
      vec3 dense = mix(vec3(0.600, 0.616, 0.650), vec3(0.070, 0.071, 0.080), night);
      vec3 ambient = mix(vec3(0.580, 0.598, 0.640), vec3(0.420, 0.420, 0.440), night);
      vec3 sunLight = mix(vec3(0.560, 0.545, 0.520), vec3(0.720, 0.720, 0.740), night);

      float tStart = CLOUD_TOP / rd.y;
      float tEnd = min(CLOUD_BOTTOM / rd.y, MAX_DISTANCE);
      // Jitter the start to trade banding for fine grain.
      float tt = tStart + hash(gl_FragCoord.xy) * max(0.03, 0.03 * tStart);
      vec4 sum = vec4(0.0);

      for (int i = 0; i < 80; i++) {
        if (tt > tEnd || sum.a > 0.98) break;
        vec3 pos = rd * tt;
        int octaves = tt < 12.0 ? 4 : 3;
        float den = density(pos, octaves);
        if (den > 0.01) {
          // Less cloud towards the sun means this point is lit.
          float towardsSun = density(pos + 0.3 * SUN, octaves - 1);
          float diffuse = clamp((den - towardsSun) / 0.5, 0.0, 1.0);
          vec3 c = mix(lit, dense, den) * (ambient + sunLight * diffuse);
          c = mix(c, haze, 1.0 - exp(-0.0004 * tt * tt));
          float a = den * 0.8;
          sum.rgb += c * a * (1.0 - sum.a);
          sum.a += a * (1.0 - sum.a);
        }
        tt += max(0.03, 0.03 * tt);
      }

      col = sum.rgb + haze * (1.0 - sum.a);
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

/** Random 256² texture for noise3(): green is red shifted by (37, 239). Seeded, so the sky is the same on every visit. */
function createNoiseTexture(gl: WebGLRenderingContext) {
  const size = 256;
  let seed = 0x9e3779b9;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const red = new Uint8Array(size * size);
  for (let i = 0; i < red.length; i++) red[i] = Math.floor(random() * 256);

  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      pixels[i * 4] = red[i];
      pixels[i * 4 + 1] = red[((y - 239 + size) % size) * size + ((x - 37 + size) % size)];
      pixels[i * 4 + 3] = 255;
    }
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return texture;
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

  gl.activeTexture(gl.TEXTURE0);
  createNoiseTexture(gl);
  gl.uniform1i(gl.getUniformLocation(program, 'uNoise'), 0);

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
  let scale: number = window.innerWidth < 768 ? SCALE.mobile : SCALE.desktop;
  let slowFrames = 0;

  const resize = () => {
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

  // If frames keep arriving late, the GPU is struggling: render fewer pixels.
  const govern = (interval: number) => {
    slowFrames = interval > 1000 / 20 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
    if (slowFrames > 20 && scale > SCALE.min) {
      scale = Math.max(SCALE.min, scale * 0.8);
      slowFrames = 0;
    }
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
      if (lastDraw) govern(now - lastDraw);
      lastDraw = now;
      // Wrapped so noise coordinates keep their precision on long visits.
      time = (time + dt) % 7200;
      const ease = 1 - Math.exp(-dt * 4.5);
      night += (isNight() - night) * ease;
      horizon += (horizonTarget() - horizon) * (1 - Math.exp(-dt * 2.5));
      if (settled()) {
        night = isNight();
      }
      draw();
    } else {
      time = (time + dt) % 7200;
    }
    frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (!frame) {
      last = performance.now();
      lastDraw = 0;
      frame = requestAnimationFrame(tick);
    }
  };

  new MutationObserver(wake).observe(root, { attributes: true, attributeFilter: ['class', 'data-page'] });
  window.addEventListener('resize', wake);
  reducedMotion.addEventListener('change', wake);
  // Background tabs stop rAF; do not count the gap as a slow frame.
  document.addEventListener('visibilitychange', () => {
    lastDraw = 0;
  });

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
