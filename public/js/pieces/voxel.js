var noiseFrag =
  "vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\nvec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\n\nconst float MAX_ITERATIONS = 10.0;\n\nfloat cnoise(vec4 P){\n vec4 Pi0 = floor(P);\n vec4 Pi1 = Pi0 + 1.0;\n Pi0 = mod(Pi0, 289.0);\n Pi1 = mod(Pi1, 289.0);\n vec4 Pf0 = fract(P);\n vec4 Pf1 = Pf0 - 1.0;\n vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n vec4 iy = vec4(Pi0.yy, Pi1.yy);\n vec4 iz0 = vec4(Pi0.zzzz);\n vec4 iz1 = vec4(Pi1.zzzz);\n vec4 iw0 = vec4(Pi0.wwww);\n vec4 iw1 = vec4(Pi1.wwww);\n\n vec4 ixy = permute(permute(ix) + iy);\n vec4 ixy0 = permute(ixy + iz0);\n vec4 ixy1 = permute(ixy + iz1);\n vec4 ixy00 = permute(ixy0 + iw0);\n vec4 ixy01 = permute(ixy0 + iw1);\n vec4 ixy10 = permute(ixy1 + iw0);\n vec4 ixy11 = permute(ixy1 + iw1);\n\n vec4 gx00 = ixy00 / 7.0;\n vec4 gy00 = floor(gx00) / 7.0;\n vec4 gz00 = floor(gy00) / 6.0;\n gx00 = fract(gx00) - 0.5;\n gy00 = fract(gy00) - 0.5;\n gz00 = fract(gz00) - 0.5;\n vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n vec4 sw00 = step(gw00, vec4(0.0));\n gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n vec4 gx01 = ixy01 / 7.0;\n vec4 gy01 = floor(gx01) / 7.0;\n vec4 gz01 = floor(gy01) / 6.0;\n gx01 = fract(gx01) - 0.5;\n gy01 = fract(gy01) - 0.5;\n gz01 = fract(gz01) - 0.5;\n vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n vec4 sw01 = step(gw01, vec4(0.0));\n gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n vec4 gx10 = ixy10 / 7.0;\n vec4 gy10 = floor(gx10) / 7.0;\n vec4 gz10 = floor(gy10) / 6.0;\n gx10 = fract(gx10) - 0.5;\n gy10 = fract(gy10) - 0.5;\n gz10 = fract(gz10) - 0.5;\n vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n vec4 sw10 = step(gw10, vec4(0.0));\n gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n vec4 gx11 = ixy11 / 7.0;\n vec4 gy11 = floor(gx11) / 7.0;\n vec4 gz11 = floor(gy11) / 6.0;\n gx11 = fract(gx11) - 0.5;\n gy11 = fract(gy11) - 0.5;\n gz11 = fract(gz11) - 0.5;\n vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n vec4 sw11 = step(gw11, vec4(0.0));\n gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n\n vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n g0000 *= norm00.x;\n g0100 *= norm00.y;\n g1000 *= norm00.z;\n g1100 *= norm00.w;\n\n vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n g0001 *= norm01.x;\n g0101 *= norm01.y;\n g1001 *= norm01.z;\n g1101 *= norm01.w;\n\n vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n g0010 *= norm10.x;\n g0110 *= norm10.y;\n g1010 *= norm10.z;\n g1110 *= norm10.w;\n\n vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n g0011 *= norm11.x;\n g0111 *= norm11.y;\n g1011 *= norm11.z;\n g1111 *= norm11.w;\n\n float n0000 = dot(g0000, Pf0);\n float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n float n1111 = dot(g1111, Pf1);\n\n vec4 fade_xyzw = fade(Pf0);\n vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n return 2.2 * n_xyzw;\n}\n\nfloat fbm(vec4 x, float octaves) {\n float v = 0.0;\n float a = 0.5;\n vec4 shift = vec4(100);\n for (float i = 0.0; i < MAX_ITERATIONS; ++i) {\n if(i < octaves){\n v += a * cnoise(x);\n x = x * 2.0 + shift;\n a *= 0.5;\n }\n }\n return v;\n}";
const vertexShaderP =
    "precision highp float;\nattribute vec2 position;\nvoid main() {\n gl_Position = vec4(position, 1.0, 1.0);\n}",
  fragmentShaderP =
    "precision highp float;\n\n" +
    noiseFrag +
    '\nuniform sampler2D uScene;\nuniform vec2 uResolution;\nuniform float time;\nvoid main() {\n vec2 uv = gl_FragCoord.xy / uResolution.xy;\n vec3 color = vec3(uv, 1.0);\n color = texture2D(uScene, uv).rgb;\n\n vec4 col = vec4(0);\n vec2 texel = uv;\n \n vec4 pixel = vec4(texture2D(uScene, texel));\n\n float glow = 0.001;\n\n vec4 bloom = vec4(0); // The vector to contain the new, "bloomed" colour values\n\n bloom += (texture2D(uScene, vec2(texel.x, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x - glow, texel.y - glow)));\n bloom += (texture2D(uScene, vec2(texel.x + glow, texel.y + glow)));\n bloom += (texture2D(uScene, vec2(texel.x + glow, texel.y - glow)));\n bloom += (texture2D(uScene, vec2(texel.x - glow, texel.y + glow)));\n bloom += (texture2D(uScene, vec2(texel.x + glow, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x - glow, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x, texel.y + glow)));\n bloom += (texture2D(uScene, vec2(texel.x, texel.y - glow)));\n\n bloom += (texture2D(uScene, vec2(texel.x, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x - glow*2.0, texel.y - glow*2.0)));\n bloom += (texture2D(uScene, vec2(texel.x + glow*2.0, texel.y + glow*2.0)));\n bloom += (texture2D(uScene, vec2(texel.x + glow*2.0, texel.y - glow*2.0)));\n bloom += (texture2D(uScene, vec2(texel.x - glow*2.0, texel.y + glow*2.0)));\n bloom += (texture2D(uScene, vec2(texel.x + glow*2.0, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x - glow*2.0, texel.y)));\n bloom += (texture2D(uScene, vec2(texel.x, texel.y + glow*2.0)));\n bloom += (texture2D(uScene, vec2(texel.x, texel.y - glow*2.0)));\n\n float noise = cnoise(vec4(0.0,0.0,0.0,time)) * 0.5 + 0.7;\n bloom = clamp(bloom / 9.0, 0.0, 1.0);\n\n col = pixel + bloom*1.0*noise;\n\n gl_FragColor = vec4(col.rgb * (1.0 - distance(uv,vec2(0.5,0.5))*1.0),1.0);\n}';
THREE.PostFX = class {
  constructor(e) {
    (this.renderer = e),
      (this.scene = new THREE.Scene()),
      (this.dummyCamera = new THREE.OrthographicCamera()),
      (this.geometry = new THREE.BufferGeometry());
    const n = new Float32Array([-1, -1, 3, -1, -1, 3]);
    this.geometry.setAttribute("position", new THREE.BufferAttribute(n, 2)),
      (this.resolution = new THREE.Vector2()),
      this.renderer.getDrawingBufferSize(this.resolution),
      (this.target = new THREE.WebGLRenderTarget(
        this.resolution.x,
        this.resolution.y,
        { format: THREE.RGBAFormat, stencilBuffer: !1, depthBuffer: !0 }
      )),
      (this.material = new THREE.RawShaderMaterial({
        fragmentShader: fragmentShaderP,
        vertexShader: vertexShaderP,
        uniforms: {
          time: { value: 0 },
          uScene: { value: this.target.texture },
          uResolution: { value: this.resolution },
        },
      })),
      (this.triangle = new THREE.Mesh(this.geometry, this.material)),
      (this.triangle.frustumCulled = !1),
      this.scene.add(this.triangle);
  }
  render(e, n) {
    (this.material.uniforms.time.value += 0.01),
      this.renderer.setRenderTarget(this.target),
      this.renderer.render(e, n),
      this.renderer.setRenderTarget(null),
      this.renderer.render(this.scene, this.dummyCamera);
  }
  update() {
    (this.resolution = new THREE.Vector2()),
      this.renderer.getDrawingBufferSize(this.resolution),
      this.target.setSize(this.resolution.x, this.resolution.y),
      (this.material.uniforms.uResolution.value = this.resolution);
  }
};

var vertexShader =
    "\nvarying vec3 vPos;\nvarying vec2 vUv;\nvarying vec2 vN;\n\nvoid main() {\n\n\tvPos = position;\n\tvUv = uv;\n\n\tfloat vignette = (1.0 - distance(vUv,vec2(0.5,0.5))*2.5);\n\tif(vignette < 0.0) vignette = 0.0;\n\tif(vignette > 1.0) vignette = 1.0;\n\n\tvec3 myPosition = position;\n\n\tvec3 e = normalize( vec3( modelViewMatrix * vec4( myPosition, 1.0 ) ) );\n\tvec3 n = normalize( normalMatrix * normal );\n\n\tvec3 r = reflect( e, n );\n\tfloat m = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );\n\tvN = r.xy / m + .5;\n\n\tvec4 mvPosition = modelViewMatrix * vec4( myPosition, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\n}",
  fragmentShader =
    noiseFrag +
    "\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nuniform sampler2D tMatCap;\nuniform float dist;\nuniform float isDark;\nuniform float isFull;\nuniform float isBG;\nuniform float isWireframe;\nuniform float isFullColor;\nuniform float fullColor;\nuniform vec3 color1;\nuniform vec3 color2;\nuniform float time;\nuniform float timeSpeed;\nuniform float freq;\nuniform float width;\nuniform float isSphere;\nuniform float oct;\n\nvarying vec2 vN;\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n\treturn min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\nvoid main() {\n\tvec2 vN2 = vec2(map(vN.x,0.01,0.99,0.0,1.0),map(vN.y,0.01,0.99,0.0,1.0));\n\tif(vN2.x < 0.01) vN2.x = 0.01;\n\tif(vN2.x > 0.99) vN2.x = 0.99;\n\n\tvec3 mC = texture2D( tMatCap, vN2 ).rgb;\n\n\tfloat noise = (fbm(vec4(vPos.x*freq,vPos.y*freq,vPos.z*freq,time*timeSpeed),oct));\n\n\tvec3 color = vec3(1.0);\n\tif(isFullColor == 1.0){\n\t\tcolor = mix(color1,color2,map(abs(noise),0.0,width,0.0,1.0));\n\t}\n\telse{\n\t\tcolor = mix(color2,color1,map(abs(noise),0.0,width,0.0,1.0));\n\t}\n\n\tif(isBG == 1.0){\n\t\tcolor = mix(color2,color1,map(noise,-1.0,1.0,0.0,1.0));\n\t\tcolor *= 1.0;\n\t\tcolor *= map(vUv.y,0.45,0.65,0.0,1.0);\n\t\tgl_FragColor = vec4(color,1.0);\n\t}\n\telse{\n\t\tvec3 base = (mC * 0.5 + 0.5) * color*1.5;\n\n\n\t\tif(isFull == 1.0){\n\t\t\tvec3 c = color1;\n\t\t\tif(fullColor == 2.0) c = color2;\n\t\t\tgl_FragColor = vec4( (mC * 0.5 + 0.5) * c * 3.0, 1.0 );\n\t\t}\n\t\telse if(isWireframe == 1.0 && isSphere != 1.0){\n\t\t\tif(vUv.x > 0.02 && vUv.x < 0.98 && vUv.y > 0.02 && vUv.y < 0.98){\n\t\t\t\tgl_FragColor = vec4( mC * 0.5, 1.0 );\n\t\t\t}\n\t\t\telse{\n\t\t\t\tvec3 c = color1;\n\t\t\t\tif(fullColor == 2.0) c = color2;\n\t\t\t\tgl_FragColor = vec4( (mC * 0.5 + 0.5) * c * 3.0, 1.0 );\n\t\t\t}\n\t\t}\n\t\telse{\n\t\t\tif(noise > -width && noise < width && isDark != 1.0 && ((vUv.x > 0.02 && vUv.x < 0.98 && vUv.y > 0.02 && vUv.y < 0.98) || isSphere == 1.0)){\n\t\t\t\tif(isSphere == 1.0){\n\t\t\t\t\tgl_FragColor = vec4( base * (mC * 0.3 + 0.7) , 1.0 );\n\t\t\t\t}\n\t\t\t\telse{\n\t\t\t\t\tgl_FragColor = vec4( base * (0.8 + (1.0 - distance(vUv,vec2(0.5,0.5))*2.0)), 1.0 );\n\t\t\t\t}\n\t\t\t}\n\t\t\telse{\n\t\t\t\tgl_FragColor = vec4( mC * 0.5, 1.0 );\n\t\t\t}\n\t\t}\n\n\t\tgl_FragColor.rgb *= dist;\n\t}\n\n}";
!(function () {
  class t extends THREE.LatheGeometry {
    constructor(t = 1, e = 1, n = 4, r = 8) {
      const o = new THREE.Path();
      o.absarc(0, -e / 2, t, 1.5 * Math.PI, 0),
        o.absarc(0, e / 2, t, 0, 0.5 * Math.PI),
        super(o.getPoints(n), r),
        (this.type = "CapsuleGeometry"),
        (this.parameters = {
          radius: t,
          height: e,
          capSegments: n,
          radialSegments: r,
        });
    }
  }
  THREE.CapsuleGeometry = t;
})(),
  (function () {
    const t = new THREE.Vector3();
    function e(e, n, r, o, i, a) {
      const l = (2 * Math.PI * i) / 4,
        s = Math.max(a - 2 * i, 0),
        v = Math.PI / 4;
      t.copy(n), (t[o] = 0), t.normalize();
      const c = (0.5 * l) / (l + s),
        m = 1 - t.angleTo(e) / v;
      if (1 === Math.sign(t[r])) return m * c;
      return s / (l + s) + c + c * (1 - m);
    }
    class n extends THREE.BoxBufferGeometry {
      constructor(t = 1, n = 1, r = 1, o = 2, i = 0.1) {
        if (
          ((o = 2 * o + 1),
          (i = Math.min(t / 2, n / 2, r / 2, i)),
          super(1, 1, 1, o, o, o),
          1 === o)
        )
          return;
        const a = this.toNonIndexed();
        (this.index = null),
          (this.attributes.position = a.attributes.position),
          (this.attributes.normal = a.attributes.normal),
          (this.attributes.uv = a.attributes.uv);
        const l = new THREE.Vector3(),
          s = new THREE.Vector3(),
          v = new THREE.Vector3(t, n, r).divideScalar(2).subScalar(i),
          c = this.attributes.position.array,
          m = this.attributes.normal.array,
          u = this.attributes.uv.array,
          f = c.length / 6,
          d = new THREE.Vector3(),
          x = 0.5 / o;
        for (let o = 0, a = 0; o < c.length; o += 3, a += 2) {
          l.fromArray(c, o),
            s.copy(l),
            (s.x -= Math.sign(s.x) * x),
            (s.y -= Math.sign(s.y) * x),
            (s.z -= Math.sign(s.z) * x),
            s.normalize(),
            (c[o + 0] = v.x * Math.sign(l.x) + s.x * i),
            (c[o + 1] = v.y * Math.sign(l.y) + s.y * i),
            (c[o + 2] = v.z * Math.sign(l.z) + s.z * i),
            (m[o + 0] = s.x),
            (m[o + 1] = s.y),
            (m[o + 2] = s.z);
          switch (Math.floor(o / f)) {
            case 0:
              d.set(1, 0, 0),
                (u[a + 0] = e(d, s, "z", "y", i, r)),
                (u[a + 1] = 1 - e(d, s, "y", "z", i, n));
              break;
            case 1:
              d.set(-1, 0, 0),
                (u[a + 0] = 1 - e(d, s, "z", "y", i, r)),
                (u[a + 1] = 1 - e(d, s, "y", "z", i, n));
              break;
            case 2:
              d.set(0, 1, 0),
                (u[a + 0] = 1 - e(d, s, "x", "z", i, t)),
                (u[a + 1] = e(d, s, "z", "x", i, r));
              break;
            case 3:
              d.set(0, -1, 0),
                (u[a + 0] = 1 - e(d, s, "x", "z", i, t)),
                (u[a + 1] = 1 - e(d, s, "z", "x", i, r));
              break;
            case 4:
              d.set(0, 0, 1),
                (u[a + 0] = 1 - e(d, s, "x", "y", i, t)),
                (u[a + 1] = 1 - e(d, s, "y", "x", i, n));
              break;
            case 5:
              d.set(0, 0, -1),
                (u[a + 0] = e(d, s, "x", "y", i, t)),
                (u[a + 1] = 1 - e(d, s, "y", "x", i, n));
          }
        }
      }
    }
    THREE.RoundedBoxGeometry = n;
  })(),
  (function () {
    class t extends THREE.Mesh {
      constructor(e, n = {}) {
        super(e),
          (this.isReflector = !0),
          (this.type = "Reflector"),
          (this.camera = new THREE.PerspectiveCamera());
        const r = this,
          o =
            void 0 !== n.color
              ? new THREE.Color(n.color)
              : new THREE.Color(8355711),
          i = n.textureWidth || 512,
          a = n.textureHeight || 512,
          l = n.clipBias || 0,
          s = n.shader || t.ReflectorShader,
          v = void 0 !== n.multisample ? n.multisample : 4,
          c = new THREE.Plane(),
          m = new THREE.Vector3(),
          u = new THREE.Vector3(),
          f = new THREE.Vector3(),
          d = new THREE.Matrix4(),
          x = new THREE.Vector3(0, 0, -1),
          g = new THREE.Vector4(),
          p = new THREE.Vector3(),
          h = new THREE.Vector3(),
          y = new THREE.Vector4(),
          b = new THREE.Matrix4(),
          E = this.camera,
          M = new THREE.WebGLRenderTarget(i, a, { samples: v }),
          R = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(s.uniforms),
            fragmentShader: s.fragmentShader,
            vertexShader: s.vertexShader,
            transparent: !0,
          });
        (R.uniforms.tDiffuse.value = M.texture),
          (R.uniforms.color.value = o),
          (R.uniforms.tM.value = b),
          (this.material = R),
          (this.onBeforeRender = function (t, e, n) {
            if (
              (u.setFromMatrixPosition(r.matrixWorld),
              f.setFromMatrixPosition(n.matrixWorld),
              d.extractRotation(r.matrixWorld),
              m.set(0, 0, 1),
              m.applyMatrix4(d),
              p.subVectors(u, f),
              p.dot(m) > 0)
            )
              return;
            p.reflect(m).negate(),
              p.add(u),
              d.extractRotation(n.matrixWorld),
              x.set(0, 0, -1),
              x.applyMatrix4(d),
              x.add(f),
              h.subVectors(u, x),
              h.reflect(m).negate(),
              h.add(u),
              E.position.copy(p),
              E.up.set(0, 1, 0),
              E.up.applyMatrix4(d),
              E.up.reflect(m),
              E.lookAt(h),
              (E.far = n.far),
              E.updateMatrixWorld(),
              E.projectionMatrix.copy(n.projectionMatrix),
              b.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
              b.multiply(E.projectionMatrix),
              b.multiply(E.matrixWorldInverse),
              b.multiply(r.matrixWorld),
              c.setFromNormalAndCoplanarPoint(m, u),
              c.applyMatrix4(E.matrixWorldInverse),
              g.set(c.normal.x, c.normal.y, c.normal.z, c.constant);
            const o = E.projectionMatrix;
            (y.x = (Math.sign(g.x) + o.elements[8]) / o.elements[0]),
              (y.y = (Math.sign(g.y) + o.elements[9]) / o.elements[5]),
              (y.z = -1),
              (y.w = (1 + o.elements[10]) / o.elements[14]),
              g.multiplyScalar(2 / g.dot(y)),
              (o.elements[2] = g.x),
              (o.elements[6] = g.y),
              (o.elements[10] = g.z + 1 - l),
              (o.elements[14] = g.w),
              (M.texture.encoding = t.outputEncoding),
              (r.visible = !1);
            const i = t.getRenderTarget();
            t.setRenderTarget(M),
              t.state.buffers.depth.setMask(!0),
              t.render(e, E),
              t.setRenderTarget(i),
              (r.visible = !0),
              (R.uniforms.time.value += 0.1);
          }),
          (this.getRenderTarget = function () {
            return M;
          }),
          (this.dispose = function () {
            M.dispose(), r.ma.dispose();
          });
      }
    }
    (t.ReflectorShader = {
      uniforms: {
        time: { value: 0 },
        color: { value: null },
        tDiffuse: { value: null },
        tM: { value: null },
      },
      vertexShader:
        "\n\t\tuniform mat4 tM;\n\t\tvarying vec4 vUv;\n\t\tvarying vec2 vUv2;\n\n\t\t#include <common>\n\t\t#include <logdepthbuf_pars_vertex>\n\n\t\tvoid main() {\n\n\t\t\tvUv = tM * vec4( position, 1.0 );\n\t\t\tvUv2 = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t\t#include <logdepthbuf_vertex>\n\n\t\t}",
      fragmentShader:
        noiseFrag +
        "\n\t\tuniform vec3 color;\n\t\tuniform float time;\n\t\tuniform sampler2D tDiffuse;\n\t\tvarying vec4 vUv;\n\t\tvarying vec2 vUv2;\n\n\t\t#include <logdepthbuf_pars_fragment>\n\n\t\tfloat blendOverlay( float base, float blend ) {\n\n\t\t\treturn( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n\n\t\t}\n\n\t\tvec3 blendOverlay( vec3 base, vec3 blend ) {\n\n\t\t\treturn vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\t#include <logdepthbuf_fragment>\n\n\t\t\tvec4 uv = vec4(vUv.x + cnoise(vec4(vUv.x,vUv.y*10.0,0.0,time*0.1))*0.1,vUv.y,vUv.z,vUv.w);\n\t\t\tvec4 base = texture2DProj( tDiffuse, uv );\n\t\t\t gl_FragColor = vec4( blendOverlay( base.rgb, color ), 0.3 * (1.0-distance(vec2(0.5,0.5),vUv2)*2.0) );\n\n\t\t\t#include <encodings_fragment>\n\n\t\t}",
    }),
      (THREE.Reflector = t);
  })();
var Ra = function (e) {
  this.s = e;
};
Ra.prototype = {
  rd: function () {
    var e = this;
    return (
      (e.s ^= e.s << 13),
      (e.s ^= e.s >> 17),
      (e.s ^= e.s << 5),
      ((e.s < 0 ? 1 + ~e.s : e.s) % 1e3) / 1e3
    );
  },
  rb: function (e, r) {
    return e + (r - e) * this.rd();
  },
};
var seed = parseInt(tokenData.hash.slice(0, 16), 16),
  R = new Ra(seed),
  mr = function () {
    return R.rb(0, 1);
  },
  T = THREE,
  dD = 1;
mr() > 0.4 && ((dD = 0.9), mr() > 0.9 && (dD = 0.7)), mr() > 0.9 && (dD = 0);
var fD = 1;
mr() > 0.4 && ((fD = 0.9), mr() > 0.9 && (fD = 0.7));
var sD = 0;
mr() > 0.1 && ((sD = 0.5), mr() > 0.9 && (sD = 1));
var bD = 1;
mr() > 0.1 && ((bD = 0.95), mr() > 0.7 && (bD = 0.8));
var lXD = 1;
mr() > 0.3 && ((lXD = 0.95), mr() > 0.7 && (lXD = 0.8));
var lYD = 1;
mr() > 0.3 && ((lYD = 0.95), mr() > 0.7 && (lYD = 0.8));
var lZD = 1;
mr() > 0.3 && ((lZD = 0.95), mr() > 0.7 && (lZD = 0.8));
var density = R.rb(0.6, 0.9);
mr() < 0.4 && (density = R.rb(0.4, 0.6)), mr() > 0.9 && (density = 0);
for (
  var colors = [
      ["3a3335", "d81e5b"],
      ["c5d86d", "261c15"],
      ["272932", "4d7ea8"],
      ["050517", "cf5c36"],
      ["30011e", "d7fcd4"],
      ["f2ff49", "ff4242"],
      ["1b065e", "ff47da"],
      ["0a2342", "2ca58d"],
      ["000000", "ffffff"],
    ],
    i = 0;
  i < 5;
  i++
)
  colors.push(colors[0]), colors.push(colors[1]);
for (i = 0; i < 3; i++) colors.push(colors[2]), colors.push(colors[3]);
for (i = 0; i < 2; i++) colors.push(colors[4]), colors.push(colors[5]);
for (i = 0; i < 1; i++) colors.push(colors[6]), colors.push(colors[7]);
var colorID = Math.floor(mr() * colors.length),
  colorID2 = colorID;
mr() > 0.6 && (colorID2 = Math.floor(mr() * colors.length));
var colorStr = colors[colorID][2],
  color2Str = colors[colorID2][2],
  resStr = "Medium",
  res = Math.floor(R.rb(7, 14));
mr() > 0.5 &&
  ((res = Math.floor(R.rb(3, 7))),
  (resStr = "Low"),
  mr() > 0.8 && ((res = Math.floor(R.rb(14, 19))), (resStr = "High")));
var isShiny = !1;
mr() > 0.5 && (isShiny = !0);
var cam34 = !0,
  camB = !1;
mr() > 0.9 ? (cam34 = !1) : mr() > 0.7 && (camB = !0);
var fov = 5;
mr() > 0.5 && "Low" != resStr && (fov = 2);
var scene = new T.Scene(),
  width = 2,
  height = 2,
  ca = new T.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
ca.position.z = 28;
var renderer = new T.WebGLRenderer({ antialias: !0, alpha: !0 });
if (
  (renderer.setSize(window.innerWidth, window.innerHeight),
  (renderer.preserveDrawingBuffer = !0),
  (renderer.xr.enabled = !0),
  2400 == window.innerWidth && 2400 == window.innerHeight)
)
  renderer.setPixelRatio(2);
else {
  var dpr = window.devicePixelRatio;
  dpr > 2 && (dpr = 2), renderer.setPixelRatio(dpr);
}
renderer.setClearColor(2236962, 1);
var post = new T.PostFX(renderer),
  sp = new T.Spherical();
sp.setFromVector3(ca.position),
  cam34 &&
    ((sp.theta = Math.PI / 4),
    (sp.phi = Math.PI / 4),
    camB && (sp.phi = 0.75 * Math.PI));
var phi = sp.phi,
  theta = sp.theta;
document.body.appendChild(renderer.domElement);
var color1 = new T.Color("#" + colors[colorID][0]),
  color2 = new T.Color("#" + colors[colorID][1]),
  color3 = new T.Color("#" + colors[colorID2][0]),
  color4 = new T.Color("#" + colors[colorID2][1]),
  hsp = Math.sqrt(
    color1.r * color1.r * 0.299 +
      color1.g * color1.g * 0.587 +
      color1.b * color1.b * 0.114
  ),
  hsp2 = Math.sqrt(
    color2.r * color2.r * 0.299 +
      color2.g * color2.g * 0.587 +
      color2.b * color2.b * 0.114
  ),
  fullColor = 2;
hsp > hsp2 && (fullColor = 1);
var bgGeo = new T.SphereGeometry(50, 50, 16, 16),
  bgMat = new T.ShaderMaterial({
    uniforms: {
      time: { value: 1e3 * mr() },
      color1: { value: color1 },
      color2: { value: color2 },
      isBG: { value: 1 },
      timeSpeed: { value: mr() + 0.5 },
      freq: { value: 0.2 },
      tMatCap: { value: new T.Texture() },
      dist: { value: 1 },
      fullColor: { value: 1 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: T.BackSide,
  }),
  bg = new T.Mesh(bgGeo, bgMat);
scene.add(bg);
var cubeGeo = new T.RoundedBoxGeometry(1, 1, 1, 10, 0.1),
  cubeGeo2 = new T.RoundedBoxGeometry(1, 2, 1, 10, 0.1),
  sphereGeo = new T.IcosahedronGeometry(0.5, 10),
  capsuleGeo = new T.CapsuleGeometry(0.5, 1, 10, 30),
  world = new T.Object3D();
scene.add(world);
var container = new T.Object3D();
container.scale.set(1 / res, 1 / res, 1 / res), world.add(container);
var canvas = document.createElement("canvas");
(canvas.width = 1024), (canvas.height = 1024);
var grd,
  ctx = canvas.getContext("2d"),
  isFlat = !1;
if (
  (isShiny
    ? ((grd = ctx.createRadialGradient(
        200,
        200,
        0,
        200,
        200,
        1024
      )).addColorStop(0, "#ffffff"),
      grd.addColorStop(0.3, "#444444"),
      grd.addColorStop(0.301, "#000000"),
      grd.addColorStop(0.81, "#444444"))
    : ((grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 1024)).addColorStop(
        0,
        "#aaaaaa"
      ),
      grd.addColorStop(0.7, "#000000"),
      (isFlat = !0)),
  (ctx.fillStyle = grd),
  ctx.fillRect(0, 0, 1024, 1024),
  !isFlat)
) {
  var grd2 = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
  grd2.addColorStop(1, "rgba(0, 0, 0, 1)"),
    grd2.addColorStop(0.98, "rgba(0, 0, 0, 0)"),
    (ctx.fillStyle = grd2),
    ctx.fillRect(0, 0, 1024, 1024);
}
for (
  var tex = new T.CanvasTexture(canvas), cubes = [], vo = {}, x = 0;
  x < res - 1;
  x++
)
  for (var y = 0; y < res - 1; y++)
    for (var z = 0; z < res - 1; z++)
      if (
        mr() > bD &&
        null == vo[x + "" + y + z] &&
        null == vo[x + 1 + "" + y + z] &&
        null == vo[x + 1 + "" + (y + 1) + (z + 1)] &&
        null == vo[x + "" + (y + 1) + (z + 1)] &&
        null == vo[x + "" + y + (z + 1)] &&
        null == vo[x + "" + (y + 1) + z] &&
        null == vo[x + 1 + "" + (y + 1) + z] &&
        null == vo[x + 1 + "" + y + (z + 1)]
      ) {
        var layer = Math.abs(x - res / 2 + 0.5);
        Math.abs(y - res / 2 + 0.5) > layer &&
          (layer = Math.abs(y - res / 2 + 0.5)),
          Math.abs(z - res / 2 + 0.5) > layer &&
            (layer = Math.abs(z - res / 2 + 0.5));
        var dist = 1 + (layer -= res / 2) * (1 / 3),
          mats = [],
          isDark = mr() > dD ? 1 : 0,
          isFull = mr() > fD ? 1 : 0,
          isFullColor = mr() > 0.5 ? 1 : 2,
          isWireframe = mr() > 0.9 ? 1 : 0,
          geo = cubeGeo,
          isSphere = 0;
        mr() > sD && ((geo = sphereGeo), (isSphere = 1)),
          ((cube = getCube()).position.x = x - res / 2 + 1),
          (cube.position.y = y - res / 2 + 1),
          (cube.position.z = z - res / 2 + 1),
          cube.scale.set(2, 2, 2),
          mr() > 0.5 && (cube.rotation.x = Math.PI / 2),
          mr() > 0.5 && (cube.rotation.y = Math.PI / 2),
          container.add(cube),
          (cube.x = x),
          (cube.y = y),
          (cube.z = z),
          cubes.push(cube),
          (vo[x + "" + y + z] = cube),
          (vo[x + 1 + "" + y + z] = cube),
          (vo[x + 1 + "" + (y + 1) + (z + 1)] = cube),
          (vo[x + "" + (y + 1) + (z + 1)] = cube),
          (vo[x + "" + y + (z + 1)] = cube),
          (vo[x + "" + (y + 1) + z] = cube),
          (vo[x + 1 + "" + (y + 1) + z] = cube),
          (vo[x + 1 + "" + y + (z + 1)] = cube);
      }
for (x = 0; x < res - 1; x++)
  for (y = 0; y < res; y++)
    for (z = 0; z < res; z++)
      if (
        mr() > lXD &&
        null == vo[x + "" + y + z] &&
        null == vo[x + 1 + "" + y + z]
      ) {
        layer = Math.abs(x - res / 2 + 0.5);
        Math.abs(y - res / 2 + 0.5) > layer &&
          (layer = Math.abs(y - res / 2 + 0.5)),
          Math.abs(z - res / 2 + 0.5) > layer &&
            (layer = Math.abs(z - res / 2 + 0.5));
        (dist = 1 + (layer -= res / 2) * (1 / 3)),
          (mats = []),
          (isDark = mr() > dD ? 1 : 0),
          (isFull = mr() > fD ? 1 : 0),
          (isFullColor = mr() > 0.5 ? 1 : 2),
          (isWireframe = mr() > 0.9 ? 1 : 0),
          (geo = cubeGeo2),
          (isSphere = 0);
        mr() > sD && ((geo = capsuleGeo), (isSphere = 1)),
          ((cube = getCube()).position.x = x - res / 2 + 1),
          (cube.position.y = y - res / 2 + 0.5),
          (cube.position.z = z - res / 2 + 0.5),
          (cube.rotation.z = Math.PI / 2),
          cube.scale.set(1, 1, 1),
          container.add(cube),
          (cube.x = x),
          (cube.y = y),
          (cube.z = z),
          cubes.push(cube),
          (vo[x + "" + y + z] = cube),
          (vo[x + 1 + "" + y + z] = cube);
      }
for (x = 0; x < res; x++)
  for (y = 0; y < res - 1; y++)
    for (z = 0; z < res; z++)
      if (
        mr() > lYD &&
        null == vo[x + "" + y + z] &&
        null == vo[x + "" + (y + 1) + z]
      ) {
        layer = Math.abs(x - res / 2 + 0.5);
        Math.abs(y - res / 2 + 0.5) > layer &&
          (layer = Math.abs(y - res / 2 + 0.5)),
          Math.abs(z - res / 2 + 0.5) > layer &&
            (layer = Math.abs(z - res / 2 + 0.5));
        (dist = 1 + (layer -= res / 2) * (1 / 3)),
          (mats = []),
          (isDark = mr() > dD ? 1 : 0),
          (isFull = mr() > fD ? 1 : 0),
          (isFullColor = mr() > 0.5 ? 1 : 2),
          (isWireframe = mr() > 0.9 ? 1 : 0),
          (geo = cubeGeo2),
          (isSphere = 0);
        mr() > sD && ((geo = capsuleGeo), (isSphere = 1)),
          ((cube = getCube()).position.x = x - res / 2 + 0.5),
          (cube.position.y = y - res / 2 + 1),
          (cube.position.z = z - res / 2 + 0.5),
          cube.scale.set(1, 1, 1),
          container.add(cube),
          (cube.x = x),
          (cube.y = y),
          (cube.z = z),
          cubes.push(cube),
          (vo[x + "" + y + z] = cube),
          (vo[x + "" + (y + 1) + z] = cube);
      }
for (x = 0; x < res; x++)
  for (y = 0; y < res; y++)
    for (z = 0; z < res - 1; z++)
      if (
        mr() > lZD &&
        null == vo[x + "" + y + z] &&
        null == vo[x + "" + y + (z + 1)]
      ) {
        layer = Math.abs(x - res / 2 + 0.5);
        Math.abs(y - res / 2 + 0.5) > layer &&
          (layer = Math.abs(y - res / 2 + 0.5)),
          Math.abs(z - res / 2 + 0.5) > layer &&
            (layer = Math.abs(z - res / 2 + 0.5));
        (dist = 1 + (layer -= res / 2) * (1 / 3)),
          (mats = []),
          (isDark = mr() > dD ? 1 : 0),
          (isFull = mr() > fD ? 1 : 0),
          (isFullColor = mr() > 0.5 ? 1 : 2),
          (isWireframe = mr() > 0.9 ? 1 : 0),
          (geo = cubeGeo2),
          (isSphere = 0);
        mr() > sD && ((geo = capsuleGeo), (isSphere = 1)),
          ((cube = getCube()).position.x = x - res / 2 + 0.5),
          (cube.position.y = y - res / 2 + 0.5),
          (cube.position.z = z - res / 2 + 1),
          (cube.rotation.x = Math.PI / 2),
          cube.scale.set(1, 1, 1),
          container.add(cube),
          (cube.x = x),
          (cube.y = y),
          (cube.z = z),
          cubes.push(cube),
          (vo[x + "" + y + z] = cube),
          (vo[x + "" + y + (z + 1)] = cube);
      }
for (x = 0; x < res; x++)
  for (y = 0; y < res; y++)
    for (z = 0; z < res; z++)
      if (mr() > density && null == vo[x + "" + y + z]) {
        layer = Math.abs(x - res / 2 + 0.5);
        if (
          (Math.abs(y - res / 2 + 0.5) > layer &&
            (layer = Math.abs(y - res / 2 + 0.5)),
          Math.abs(z - res / 2 + 0.5) > layer &&
            (layer = Math.abs(z - res / 2 + 0.5)),
          (dist = 1 + (layer -= res / 2) * (1 / 3)) > 0)
        ) {
          (mats = []),
            (isDark = mr() > dD ? 1 : 0),
            (isFull = mr() > fD ? 1 : 0),
            (isFullColor = mr() > 0.5 ? 1 : 2),
            (isWireframe = mr() > 0.9 ? 1 : 0);
          var cube,
            d = new T.Vector3(x - res / 2, y - res / 2, z - res / 2).distanceTo(
              new T.Vector3()
            );
          (geo = cubeGeo), (isSphere = 0);
          mr() > sD && ((geo = sphereGeo), (isSphere = 1)),
            ((cube = getCube()).position.x = x - res / 2 + 0.5),
            (cube.position.y = y - res / 2 + 0.5),
            (cube.position.z = z - res / 2 + 0.5),
            (vo[x + "" + y + z] = cube),
            mr() > 0.5 && (cube.rotation.x = Math.PI / 2),
            mr() > 0.5 && (cube.rotation.y = Math.PI / 2),
            container.add(cube),
            (cube.x = x),
            (cube.y = y),
            (cube.z = z),
            cubes.push(cube);
        }
        vo[x + "" + y + z] = cube;
      }
function getCube() {
  var e = color1,
    r = color2;
  mr() > 0.5 && ((e = color3), (r = color4));
  for (var o = 0; o < 6; o++) {
    var a = new T.ShaderMaterial({
      uniforms: {
        time: { value: 1e3 * o + 1e3 * mr() },
        timeSpeed: { value: mr() + 0.5 },
        freq: { value: 5 * mr() + 0.2 },
        tMatCap: { value: tex },
        dist: { value: dist },
        isDark: { value: isDark },
        isFull: { value: isFull },
        isFullColor: { value: isFullColor },
        isWireframe: { value: isWireframe },
        fullColor: { value: fullColor },
        color1: { value: e },
        color2: { value: r },
        width: { value: mr() },
        isSphere: { value: isSphere },
        oct: { value: 2 * mr() + 0.1 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    mats.push(a);
  }
  return new T.Mesh(geo, 1 == isSphere ? mats[0] : mats);
}
if (res / 2 - 3 > 0) {
  var blackCube = new T.Mesh(
    new T.BoxGeometry(1, 1, 1, 1, 1, 1),
    new T.MeshBasicMaterial({ color: 0 })
  );
  blackCube.scale.set(res / 2 - 3, res / 2 - 3, res / 2 - 3),
    container.add(blackCube);
}
var mirror = new T.Reflector(new T.PlaneBufferGeometry(10, 10, 1, 1));
(mirror.position.y = -0.5),
  (mirror.rotation.x = -Math.PI / 2),
  scene.add(mirror);
var vX = 0,
  sX = 0,
  vY = 0,
  sY = 0,
  isDown = !1;
function resize() {
  var e = window.innerWidth,
    r = window.innerHeight;
  (ca.aspect = e / r),
    ca.updateProjectionMatrix(),
    renderer.setSize(e, r),
    post.update();
}
function loop() {
  post.render(scene, ca),
    isDown || ((vX *= 0.9), (vY *= 0.9)),
    (sp.theta -= 0.005 * vX),
    (sp.phi -= 0.005 * vY),
    sp.phi < 0.001 && (sp.phi = 0.001),
    sp.phi > Math.PI - 0.001 && (sp.phi = Math.PI - 0.001),
    ca.position.setFromSpherical(sp),
    ca.lookAt(container.position),
    (bgMat.uniforms.time.value += 0.01),
    cubes.forEach(function (e) {
      e.material.length
        ? e.material.forEach(function (e) {
            e.uniforms.time.value += 0.01;
          })
        : (e.material.uniforms.time.value += 0.01);
    });
}
window.addEventListener("pointerdown", function (e) {
  e.preventDefault(),
    (isDown = !0),
    (sX = e.clientX),
    (vX = 0),
    (sY = e.clientY),
    (vY = 0);
}),
  document.addEventListener("touchmove", function (e) {
    e.preventDefault(), e.stopImmediatePropagation();
  }),
  window.addEventListener("pointermove", function (e) {
    e.preventDefault(),
      isDown &&
        ((vX = e.clientX - sX),
        (sX = e.clientX),
        (vY = e.clientY - sY),
        (sY = e.clientY));
  }),
  window.addEventListener("pointerup", function (e) {
    e.preventDefault(), (isDown = !1);
  }),
  window.addEventListener("mouseleave", function (e) {
    e.preventDefault(), (isDown = !1);
  }),
  window.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault(),
        ca.fov + 0.01 * e.deltaY < 8 &&
          ca.fov + 0.01 * e.deltaY > 1 &&
          ((ca.fov += 0.01 * e.deltaY), ca.updateProjectionMatrix());
    },
    { passive: !1 }
  ),
  window.addEventListener("resize", resize),
  renderer.setAnimationLoop(loop);
