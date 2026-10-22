// Sky shader driving the full-screen background canvas (see SkyCanvas.astro).
//
// Below the horizon, every pixel casts a ray into a volumetric layer of cloud
// and accumulates its density front to back, with one extra sample towards the
// sun for self-shadowing. That is what gives the puffs real volume. Above the
// horizon, a cheap 2D sky with drifting high clouds and, at night, stars.
//
// On the .earth page the camera flies down into the sea of clouds, through
// their soft interior and out under them, then glides down a valley to the
// shore of a lake that mirrors the clouds and the hills. The land and the
// lake are ray-marched too. Leaving the page flies back up.

// Horizon height (fraction of the viewport from the bottom) per page type.
// `home` must match --horizon in assets/styles/site.css.
const HORIZON = { home: 0.4, content: 0.28, earth: 0.4 } as const;
const MAX_FPS = 30;
// Frame rate while flying, so the motion stays fluid.
const FLIGHT_FPS = 60;

// Length of the flight between the sea of clouds and the land, in seconds.
const FLIGHT = { down: 10, up: 6 } as const;
// The .earth hero text fades in once the flight down is this far along.
const REVEAL_AT = 0.8;

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
  // 0 at rest above the sea of clouds, 1 under them, over the valley (eased in
  // JavaScript).
  uniform float uDescent;
  uniform sampler2D uNoise;

  const float CLOUD_TOP = -0.55;
  const float CLOUD_BOTTOM = -1.8;
  const float MAX_DISTANCE = 60.0;
  const vec3 SUN = vec3(-0.640, 0.533, 0.480);
  // Rotation between octaves, so the grid of the value noise never lines up.
  const mat3 ROT3 = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);

  // The land: a valley floor, the lake in it, and the highest the land gets.
  const vec2 LAKE = vec2(0.6, 14.0);
  const float GROUND = -3.35;
  const float WATER = -3.33;
  // The flight down ends on the near shore of the lake, just above the water,
  // looking across it. On the way it looks down at the valley, then levels out.
  const vec3 CAMERA_END = vec3(0.6, WATER + 0.1, 10.0);
  const float CAMERA_DIP = 0.22;
  // Final pitch: level, so the horizon lands on HORIZON.earth. The hero text sits
  // above the far hills, at --earth-horizon in site.css.
  const float CAMERA_PITCH = 0.0;
  const float LAND_TOP = -1.25;
  // Beyond this the haze hides the land completely.
  const float LAND_DISTANCE = 45.0;

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

  // Smooth 2D value noise in one texture fetch, for the land.
  float tnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return texture2D(uNoise, (i + f + 0.5) / 256.0).x;
  }

  float landFbm(vec2 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      if (i >= octaves) break;
      v += a * tnoise(p);
      p = ROT * p * 2.02 + vec2(11.3, 4.7);
      a *= 0.5;
    }
    return v;
  }

  // A valley along the flight path with a lake, slopes rising to mountains on
  // both sides and a range in the distance. Never higher than LAND_TOP.
  float landHeight(vec2 p, int octaves) {
    float n = landFbm(p * 0.32, octaves);
    float crest = 1.0 - abs(2.0 * n - 1.0);
    float meander = 1.1 * sin(p.y * 0.16 + 0.4);
    float slopes = smoothstep(1.4, 6.5, abs(p.x - meander));
    float range = smoothstep(18.0, 34.0, p.y);
    float h = 0.18 * n + max(slopes * 1.7, range * 1.9) * (0.25 + 0.75 * crest * crest);
    vec2 lake = (p - LAKE) * vec2(1.0, 0.5);
    h -= 0.28 * (1.0 - smoothstep(0.0, 2.6, length(lake)));
    return GROUND + h;
  }

  // Cloud density. Puffy noise whose tops undulate around y = -1, thickening
  // with depth so the sea of clouds is opaque underneath. Fewer octaves far away.
  // (The fourth octave reaches only 0.75: a full sum would be 0.94, not 1.)
  // On the flight down, the layer gets a base for the camera to come out of.
  float density(vec3 p, int octaves) {
    vec3 q = p * 1.3 + vec3(0.03, 0.015, 0.08) * uTime;
    float f = 0.0;
    float a = 0.5;
    float first = 0.5;
    for (int i = 0; i < 4; i++) {
      if (i >= octaves) break;
      float v = noise3(q);
      if (i == 0) first = v;
      f += a * v;
      q = ROT3 * q * 2.03;
      a *= 0.5;
    }
    float den = 5.0 * f - 2.15 - (p.y + 1.0) * 5.0;
    // The base undulates, so that mountains vanish into it along a soft line.
    float base = CLOUD_BOTTOM + 0.5 * (first - 0.5);
    den -= 9.0 * smoothstep(0.0, 0.2, uDescent) * (1.0 - smoothstep(base, base + 0.5, p.y));
    return clamp(den, 0.0, 1.0);
  }

  // The 2D sky, drawn as if on the screen of a camera looking at the horizon.
  vec3 skyColor(vec3 rd, vec3 haze, vec3 zenith, float night, float t) {
    float k = 1.25 / max(rd.z, 0.08);
    float x = rd.x * k;
    float dy = max(rd.y * k, 0.0);
    float skyT = clamp(dy / max(1.0 - uHorizon, 0.05), 0.0, 1.0);
    vec3 col = mix(haze, zenith, pow(skyT, 0.8));

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
    return col;
  }

  // Distance along the ray to the land (closer than tMax), or -1.
  float marchLand(vec3 ro, vec3 rd, float tMax) {
    float t = 0.02;
    if (ro.y > LAND_TOP) {
      if (rd.y >= 0.0) return -1.0;
      t = (LAND_TOP - ro.y) / rd.y;
    }
    float tPrev = t;
    float hPrev = 1.0;
    for (int i = 0; i < 256; i++) {
      vec3 p = ro + rd * t;
      float h = p.y - landHeight(p.xz, t < 8.0 ? 4 : 3);
      // Below the ground: interpolate between the last two samples, so that
      // shorelines and ridges come out crisp instead of stepped.
      if (h < 0.0) return tPrev + (t - tPrev) * hPrev / (hPrev - h);
      if (h < 0.0005 * t) return t;
      if (t > tMax || (rd.y > 0.0 && p.y > LAND_TOP)) break;
      tPrev = t;
      hPrev = h;
      // Strides grow with distance. A ray skimming the lake needs many of them
      // to reach the mountains, but most rays stop long before the budget.
      t += max(0.5 * h, 0.01 + 0.003 * t);
    }
    return -1.0;
  }

  vec3 landColor(vec3 p, float dist, float night) {
    float e = 0.01 + 0.002 * dist;
    float hx = landHeight(p.xz + vec2(e, 0.0), 6) - landHeight(p.xz - vec2(e, 0.0), 6);
    float hz = landHeight(p.xz + vec2(0.0, e), 6) - landHeight(p.xz - vec2(0.0, e), 6);
    vec3 n = normalize(vec3(-hx, 2.0 * e, -hz));
    // Fine relief that the height field is too coarse to carry. Close by only:
    // further away it is finer than a pixel and turns into stripes.
    vec2 bump = vec2(tnoise(p.xz * 14.0 + 0.5), tnoise(p.xz * 14.0 + 9.5)) - 0.5;
    n = normalize(n + vec3(bump.x, 0.0, bump.y) * 0.18 * (1.0 - smoothstep(3.0, 10.0, dist)));
    float up = p.y - GROUND;
    float detail = tnoise(p.xz * 3.1);

    float fields = tnoise(p.xz * 0.9 + 3.0);
    vec3 c = mix(vec3(0.38, 0.46, 0.30), vec3(0.52, 0.55, 0.36), fields);
    c = mix(c, vec3(0.45, 0.49, 0.33), detail * 0.5);
    float woods = smoothstep(0.5, 0.62, tnoise(p.xz * 3.6 + 7.0) * 0.75 + fields * 0.25)
      * smoothstep(0.18, 0.4, up) * (1.0 - smoothstep(1.0, 1.3, up));
    c = mix(c, vec3(0.15, 0.22, 0.16), woods);
    c = mix(c, vec3(0.47, 0.46, 0.44), 1.0 - smoothstep(0.58, 0.8, n.y));
    c = mix(c, vec3(0.94, 0.95, 0.96), smoothstep(2.0, 2.2, up + 0.25 * detail) * smoothstep(0.5, 0.72, n.y));
    c = mix(c, vec3(dot(c, vec3(0.3, 0.59, 0.11))), 0.15 + 0.45 * night);

    // Sunlight filters through where the cloud deck is thinner.
    vec3 q = p + SUN * ((-1.2 - p.y) / SUN.y);
    float overcast = density(q, 2);
    float sun = max(dot(n, SUN), 0.0) * (1.0 - 0.75 * smoothstep(0.1, 0.9, overcast));
    vec3 sky = mix(vec3(0.60, 0.63, 0.67), vec3(0.17, 0.19, 0.25), night) * (0.55 + 0.45 * n.y);
    vec3 sunCol = mix(vec3(1.10, 1.03, 0.92), vec3(0.42, 0.48, 0.62), night);
    return c * (sky + sunCol * sun);
  }

  // Land just under the cloud base is in mist: how much, by height.
  float mist(float y) {
    return 0.85 * smoothstep(CLOUD_BOTTOM - 0.3, CLOUD_BOTTOM + 0.25, y);
  }

  // The underside of the clouds, seen from below: a soft ceiling, lighter where
  // the layer above is thin and darker where it is thick.
  vec3 undersideColor(vec3 pos, float den, float night) {
    float thick = density(vec3(pos.x, -0.95, pos.z), 2);
    float shade = clamp(0.3 * den + 0.7 * thick, 0.0, 1.0);
    return mix(
      mix(vec3(0.88, 0.89, 0.905), vec3(0.66, 0.68, 0.71), shade),
      mix(vec3(0.18, 0.182, 0.195), vec3(0.11, 0.112, 0.125), shade),
      night
    );
  }

  // The cloud ceiling along a ray going up from under it (the reflection in the
  // lake): fewer, longer steps than the main march, as it is seen through water.
  vec4 ceiling(vec3 ro, vec3 rd, float tLimit, vec3 farHaze, float night) {
    vec4 sum = vec4(0.0);
    float tt = (CLOUD_BOTTOM - ro.y) / rd.y;
    float tEnd = min(min((CLOUD_TOP - ro.y) / rd.y, MAX_DISTANCE), tLimit);
    tt += hash(gl_FragCoord.xy + 0.37) * max(0.05, 0.03 * tt);
    for (int i = 0; i < 28; i++) {
      if (tt > tEnd || sum.a > 0.97) break;
      vec3 pos = ro + rd * tt;
      float den = density(pos, 3);
      if (den > 0.01) {
        vec3 c = mix(undersideColor(pos, den, night), farHaze, 1.0 - exp(-0.03 * tt));
        float a = den * 0.8;
        sum.rgb += c * a * (1.0 - sum.a);
        sum.a += a * (1.0 - sum.a);
      }
      tt += max(0.05, 0.03 * tt);
    }
    return sum;
  }

  // The lake: a mirror for the clouds and the mountains, broken up by ripples
  // that gusts of wind sweep across, and clear enough near the shore to show
  // its bed. tView is the distance the light has already travelled to p.
  vec3 waterColor(vec3 p, vec3 rd, float tView, vec3 hazeLow, vec3 farHaze, float night, float t) {
    // Ripples: two drifting layers of noise, stronger where a gust passes, and
    // fading with distance before they turn into sparkle.
    float gust = smoothstep(0.35, 0.75, tnoise(p.xz * 0.45 + vec2(t * 0.03, -t * 0.05)));
    vec2 w = vec2(
      tnoise(p.xz * vec2(5.0, 9.0) + vec2(0.0, t * 0.35)) + 0.5 * tnoise(p.xz * vec2(11.0, 17.0) + vec2(t * 0.2, 3.1)),
      tnoise(p.xz * vec2(5.0, 9.0) + vec2(7.3, 2.9 - t * 0.3)) + 0.5 * tnoise(p.xz * vec2(11.0, 17.0) + vec2(1.7, 5.3 - t * 0.25))
    ) - 0.75;
    // They tilt the water mostly along the view, which streaks the reflections.
    float amp = (0.005 + 0.03 * gust) / (1.0 + 0.15 * tView);
    vec3 n = normalize(vec3(w.x * amp * 0.4, 1.0, w.y * amp));

    // What the lake reflects: the land first, then the ceiling up to it.
    vec3 rr = reflect(rd, n);
    rr.y = max(rr.y, 0.002);
    vec3 from = p + vec3(0.0, 0.002, 0.0);
    float tl = marchLand(from, rr, LAND_DISTANCE);
    vec3 behind = farHaze;
    if (tl > 0.0) {
      vec3 q = from + rr * tl;
      float d = tView + tl;
      behind = mix(landColor(q, d, night), hazeLow, 1.0 - exp(-0.045 * d));
      behind = mix(behind, hazeLow, mist(q.y));
      behind = mix(behind, farHaze, smoothstep(0.6 * LAND_DISTANCE, LAND_DISTANCE, d));
    }
    vec4 clouds = ceiling(from, rr, tl > 0.0 ? tl : MAX_DISTANCE, farHaze, night);
    vec3 reflection = clouds.rgb + behind * (1.0 - clouds.a);

    // Looking into the water: dark and deep, or the lake bed where it is shallow.
    float depth = WATER - landHeight(p.xz, 4);
    vec3 deep = mix(vec3(0.06, 0.09, 0.10), vec3(0.025, 0.035, 0.05), night);
    vec3 bed = mix(vec3(0.21, 0.23, 0.17), vec3(0.08, 0.09, 0.10), night);
    vec3 body = mix(bed, deep, smoothstep(0.0, 0.04, depth));

    float cosTheta = clamp(dot(-rd, n), 0.0, 1.0);
    // A softer falloff than real water (power 5), so that the clouds show in
    // the lake right up to the shore.
    float fresnel = 0.05 + 0.95 * pow(1.0 - cosTheta, 3.0);
    return mix(body, reflection, fresnel);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    float x = (uv.x - 0.5) * aspect;
    float dy = uv.y - uHorizon;
    float t = uTime;
    float night = smoothstep(0.0, 1.0, uNight);
    float descent = uDescent;

    vec3 haze = mix(vec3(0.912, 0.916, 0.921), vec3(0.150, 0.151, 0.162), night);
    vec3 zenith = mix(vec3(0.742, 0.760, 0.781), vec3(0.040, 0.042, 0.050), night);

    // Camera. At rest it floats above the sea of clouds looking at the horizon,
    // with the projection shifted so that the horizon lands on uHorizon. On the
    // way down it glides forward, sinks through the clouds, looks down at the
    // valley and levels out on the shore of the lake, all in one continuous
    // move (the easing is done in JavaScript). It sinks more slowly while it is
    // inside the clouds.
    float sink = descent + 0.2 * sin(6.2831853 * descent) * (1.0 - descent) * (1.0 - descent);
    vec3 ro = vec3(CAMERA_END.x * descent, CAMERA_END.y * sink, CAMERA_END.z * descent);
    float dip = sin(3.1415927 * descent);
    float pitch = CAMERA_DIP * dip * dip + CAMERA_PITCH * descent;
    vec3 rd = normalize(vec3(x, dy, 1.25));
    float cp = cos(pitch);
    float sp = sin(pitch);
    rd = vec3(rd.x, rd.y * cp - rd.z * sp, rd.y * sp + rd.z * cp);
    rd.y = rd.y >= 0.0 ? max(rd.y, 1e-4) : min(rd.y, -1e-4);

    vec3 lit = mix(vec3(1.0, 1.0, 1.0), vec3(0.300, 0.302, 0.325), night);
    vec3 dense = mix(vec3(0.600, 0.616, 0.650), vec3(0.070, 0.071, 0.080), night);
    vec3 ambient = mix(vec3(0.580, 0.598, 0.640), vec3(0.420, 0.420, 0.440), night);
    vec3 sunLight = mix(vec3(0.560, 0.545, 0.520), vec3(0.720, 0.720, 0.740), night);

    bool landVisible = descent > 0.1;
    // 1 once the camera is out under the clouds: their underside becomes a soft
    // ceiling and the distance fades to the same low haze as the land.
    float below = smoothstep(CLOUD_TOP - 0.25, CLOUD_BOTTOM + 0.25, ro.y);
    // 1 while the camera is inside the cloud layer.
    float inCloud = smoothstep(CLOUD_TOP + 0.05, CLOUD_TOP - 0.25, ro.y) * smoothstep(CLOUD_BOTTOM + 0.1, CLOUD_BOTTOM + 0.35, ro.y);
    vec3 hazeLow = mix(vec3(0.74, 0.76, 0.79), vec3(0.13, 0.14, 0.17), night);
    vec3 farHaze = mix(haze, hazeLow, below);
    float tHit = -1.0;
    bool lake = false;
    // Find the land first: ridges rise into the cloud base and can stand in
    // front of clouds, which are then marched only up to the land. No need to
    // look for it beyond the lake.
    float tWater = rd.y < 0.0 ? (WATER - ro.y) / rd.y : -1.0;
    if (landVisible) {
      tHit = marchLand(ro, rd, tWater > 0.0 ? min(tWater, LAND_DISTANCE) : LAND_DISTANCE);
    }

    // Clouds, marched through the part of the ray inside the cloud layer.
    float t0 = (CLOUD_TOP - ro.y) / rd.y;
    float t1 = (CLOUD_BOTTOM - ro.y) / rd.y;
    float tStart = max(min(t0, t1), 0.0);
    float tEnd = min(max(t0, t1), MAX_DISTANCE);
    if (tHit > 0.0) tEnd = min(tEnd, tHit);
    vec4 sum = vec4(0.0);

    if (tEnd > tStart) {
      // Once the camera is down among the clouds, the march crosses empty air
      // in bigger strides, or it would run out of steps before the horizon
      // (at rest, above the clouds, both strides are 0.03 as they always were).
      float emptyStride = mix(0.03, 0.08, smoothstep(0.0, 0.1, descent));
      // Jitter the start to trade banding for fine grain.
      float tt = tStart + hash(gl_FragCoord.xy) * max(0.03, 0.03 * tStart);
      float tPrev = tt;
      float fineUntil = -1.0;
      bool coarse = false;
      for (int i = 0; i < 80; i++) {
        if (tt > tEnd || sum.a > 0.98) break;
        vec3 pos = ro + rd * tt;
        // Inside the cloud, what is close by is blurry: one octave less.
        int octaves = tt < 12.0 && (inCloud < 0.5 || tt > 1.5) ? 4 : 3;
        float den = density(pos, octaves);
        // Inside the cloud, open soft holes around the camera, so that it flies
        // through wisps and puffs of cotton rather than a white wall.
        if (inCloud > 0.0) {
          float holes = smoothstep(0.4, 0.7, noise3(pos * 2.5 + vec3(0.0, 0.0, 0.05 * uTime)));
          den *= mix(1.0, holes, inCloud * (1.0 - smoothstep(0.45, 1.5, tt)));
        }
        // A big stride ended inside a cloud: go back and enter it in small
        // steps, or its surface comes out in stripes.
        if (den > 0.01 && coarse) {
          fineUntil = tt;
          tt = tPrev + max(0.03, 0.03 * tPrev);
          coarse = false;
          continue;
        }
        if (den > 0.01) {
          // Less cloud towards the sun means this point is lit.
          float towardsSun = density(pos + 0.3 * SUN, octaves - 1);
          float diffuse = clamp((den - towardsSun) / 0.5, 0.0, 1.0);
          vec3 c = mix(lit, dense, den) * (ambient + sunLight * diffuse);
          // Inside a cloud the light is bright and diffuse.
          vec3 inside = mix(lit, dense, 0.3) * (ambient + sunLight * 0.55);
          c = mix(c, inside, exp(-1.5 * tt) * smoothstep(0.05, 0.2, descent));
          // Seen from below, the clouds are a soft, even ceiling.
          if (below > 0.0) c = mix(c, undersideColor(pos, den, night), below);
          c = mix(c, farHaze, mix(1.0 - exp(-0.0004 * tt * tt), 1.0 - exp(-0.03 * tt), below));
          // Once the flight has started, the cloud right in front of the camera is
          // thinner, so that it can be seen into.
          float a = den * 0.8 * mix(1.0, 0.12 + 0.88 * smoothstep(0.0, 1.5, tt), smoothstep(0.05, 0.2, descent));
          sum.rgb += c * a * (1.0 - sum.a);
          sum.a += a * (1.0 - sum.a);
        }
        float stride = den > 0.01 || tt < fineUntil ? 0.03 : emptyStride;
        coarse = stride > 0.031;
        tPrev = tt;
        tt += max(0.03 + 0.03 * inCloud, stride * tt);
      }
    }

    if (
      landVisible &&
      sum.a < 0.98 &&
      tWater > 0.0 &&
      tWater < LAND_DISTANCE &&
      (tHit < 0.0 || tWater < tHit) &&
      landHeight((ro + rd * tWater).xz, 4) < WATER
    ) {
      lake = true;
      tHit = tWater;
    }

    // What lies behind the clouds: the land and the lake, the sky, or haze.
    vec3 background = farHaze;
    if (tHit > 0.0) {
      vec3 p = ro + rd * tHit;
      vec3 ground;
      if (lake) {
        ground = waterColor(p, rd, tHit, hazeLow, farHaze, night, t);
      } else {
        ground = landColor(p, tHit, night);
      }
      background = mix(ground, hazeLow, 1.0 - exp(-mix(0.03, 0.045, below) * tHit));
      if (!lake) background = mix(background, hazeLow, below * mist(p.y));
      // The farthest land melts into the haze.
      background = mix(background, farHaze, smoothstep(0.6 * LAND_DISTANCE, LAND_DISTANCE, tHit));
    } else if (rd.y > 0.0) {
      background = mix(skyColor(rd, haze, zenith, night, t), farHaze, below);
    }

    vec3 col = sum.rgb + background * (1.0 - sum.a);

    // Bright band along the horizon.
    float elevation = rd.y * 1.25 / max(rd.z, 0.08);
    col += mix(0.03, 0.018, night) * exp(-abs(elevation) * 40.0) * (1.0 - smoothstep(CLOUD_TOP, CLOUD_TOP - 0.3, ro.y));

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
  const uDescent = gl.getUniformLocation(program, 'uDescent');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isNight = () => (root.classList.contains('dark') ? 1 : 0);
  const page = () => root.dataset.page as keyof typeof HORIZON | undefined;
  const horizonTarget = () => HORIZON[page() ?? 'content'] ?? HORIZON.content;
  const flightTarget = () => (page() === 'earth' ? 1 : 0);
  // Smootherstep: the flight starts and ends gently.
  const eased = (v: number) => v * v * v * (v * (v * 6 - 15) + 10);

  let night = isNight();
  let horizon = horizonTarget();
  // A direct visit to /earth starts on the ground; the flight plays on navigation.
  let flight = flightTarget();
  let time = 40;
  let last = performance.now();
  let lastDraw = 0;
  let frame = 0;
  let lost = false;
  const fullScale: number = window.innerWidth < 768 ? SCALE.mobile : SCALE.desktop;
  let scale = fullScale;
  let slowFrames = 0;
  let fastFrames = 0;

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
    gl.uniform1f(uDescent, eased(flight));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // If frames keep arriving late, the GPU is struggling: render fewer pixels.
  // Very slow frames count for more, so a heavy scene is fixed within a few
  // frames; gaps over a second are pauses (hidden tab, busy page), not slowness.
  // After a few seconds of smooth frames, the resolution climbs back.
  const govern = (interval: number) => {
    if (interval > 1000) return;
    if (interval > 1000 / 20) {
      slowFrames += Math.min(4, Math.ceil(interval / 50));
      fastFrames = 0;
    } else {
      slowFrames = Math.max(0, slowFrames - 1);
      fastFrames = interval < 1000 / 28 ? fastFrames + 1 : 0;
    }
    if (slowFrames > 20 && scale > SCALE.min) {
      scale = Math.max(SCALE.min, scale * 0.8);
      slowFrames = 0;
    } else if (fastFrames > 150 && scale < fullScale) {
      scale = Math.min(fullScale, scale * 1.15);
      fastFrames = 0;
    }
  };

  const settled = () => Math.abs(night - isNight()) < 0.001 && Math.abs(horizon - horizonTarget()) < 0.0005;

  // While flying down to .earth, the page hides its hero text (see site.css).
  const syncFlying = () => {
    root.classList.toggle('is-flying', flightTarget() === 1 && flight < REVEAL_AT);
  };

  const fly = (dt: number) => {
    const target = flightTarget();
    if (flight < target) flight = Math.min(target, flight + dt / FLIGHT.down);
    else if (flight > target) flight = Math.max(target, flight - dt / FLIGHT.up);
    syncFlying();
  };

  const tick = (now: number) => {
    frame = 0;
    if (lost) return;
    const elapsed = (now - last) / 1000;
    const dt = Math.min(0.1, elapsed);
    // The flight keeps its duration even if frames are slow (but not across a hidden tab).
    const flightDt = Math.min(0.25, elapsed);
    last = now;

    if (reducedMotion.matches) {
      night = isNight();
      horizon = horizonTarget();
      flight = flightTarget();
      syncFlying();
      draw();
      return; // Redrawn only when something changes.
    }

    const flying = flight !== flightTarget();
    if (now - lastDraw >= 1000 / (flying ? FLIGHT_FPS : MAX_FPS) - 2) {
      if (lastDraw) govern(now - lastDraw);
      lastDraw = now;
      // Wrapped so noise coordinates keep their precision on long visits.
      time = (time + dt) % 7200;
      const ease = 1 - Math.exp(-dt * 4.5);
      night += (isNight() - night) * ease;
      horizon += (horizonTarget() - horizon) * (1 - Math.exp(-dt * 2.5));
      fly(flightDt);
      if (settled()) {
        night = isNight();
      }
      draw();
    } else {
      time = (time + dt) % 7200;
      fly(flightDt);
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

  new MutationObserver(() => {
    syncFlying();
    wake();
  }).observe(root, { attributes: true, attributeFilter: ['class', 'data-page'] });
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
