let camera, scene, renderer;
let sphere;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 10;

  scene = new THREE.Scene();

  sphere = createSphere();
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
}

function animation(time) {
  sphere.rotation.x = time / 2000;
  sphere.rotation.y = time / 1000;

  renderer.render(scene, camera);
}

function createSphere() {
  const geometry = new THREE.SphereGeometry(3, 50, 50);
  const material = new THREE.RawShaderMaterial({
    uniforms: {
      rgb1: {
        value: new THREE.Vector3(),
      },
      rgb2: {
        value: new THREE.Vector3(),
      },
      customNormalMatrix: {
        value: new THREE.Matrix3(),
      },
    },
    vertexShader: getVertexShader(),
    fragmentShader: getFragmentShader(),
    side: THREE.FrontSide,
  });
  const sphere = new THREE.Mesh(geometry, material);
  setColors(sphere);
  setNormalMatrix(sphere);
  return sphere;
}

function getVertexShader() {
  const vertexShader = `
    // built-in attribute
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    // built-in uniform
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;

    // 사용자 정의 uniform
    uniform mat3 customNormalMatrix; // js(cpu) 단에서 미리 계산된 노말행렬 (버텍스마다 노멀행렬을 계산하면 gpu 가 동일한 연산을 불필요하게 반복하는 문제가 있음.)

    // 보간변수
    varying vec3 vPosition; // 월드공간 버텍스좌표를 보간하여 넘김.
    varying vec3 vNormal; // 월드공간 노멀벡터를 보간하여 넘김.
    varying vec2 vUv; // 버텍스 uv좌표를 보간하여 넘김. 

    void main() {
      vec4 mPosition = modelMatrix * vec4(position, 1.0); // 모델행렬만 먼저 곱해서 최종 오브젝트공간 버텍스 좌표를 월드좌표로 변환
      vPosition = mPosition.xyz; // 월드공간 좌표를 보간하여 프래그먼트 셰이더로 넘김
      vNormal = customNormalMatrix * normal; // 월드공간 노멀벡터로 변환 후, 보간하여 프래그먼트 셰이더로 넘김 
      vUv = uv; // 버텍스 uv 좌표를 보간하여 프래그먼트 셰이더로 넘김
    
      gl_Position = projectionMatrix * viewMatrix * mPosition;
    }
`;
  return vertexShader;
}

function getFragmentShader() {
  const fragmentShader = `
    precision highp float;

    // 색상변수
    uniform vec3 rgb1;
    uniform vec3 rgb2;

    // 보간변수
    varying vec3 vPosition; // 월드공간 버텍스좌표기 보간되어 넘어옴.
    varying vec3 vNormal; // 월드공간 노멀벡터가 보간되어 넘어옴.
    varying vec2 vUv; // 버텍스 uv좌표를 보간되어 넘어옴.

    void main() {
      vec3 lowerColor = rgb1;
      vec3 upperColor = rgb2;

      /*
        mix() 함수의 alpha 값을 살펴보면,
        보간된 uv좌표의 v축(y축) 높이값에 따라
        -2.5 ~ 1.5 사이의 값을 갖게 됨.
        이 말은 즉, 
        -2.5 ~ 0.0 구간까지는 전부 lowerColor 가 칠해지고,
        0.0 ~ 0.5 구간까지는 lowerColor 가 좀 더 섞이게 되고,
        0.5 ~ 1.0 구간까지는 upperColor 가 좀 더 섞이게 되고,
        1.0 ~ 1.5 구간까지는 upperColor 가 칠해진다는 뜻.
        전체적으로 보면 lowerColor 가 
        더 많이 칠해지도록 uv좌표를 맵핑시켰다고 보면 됨.
      */
      vec3 finalCol = mix(lowerColor, upperColor, vUv.y * 4.0 - 2.5); // 보간된 uv의 y컴포넌트에 따라 두 색상을 섞어줌.

      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;
  return fragmentShader;
}

function setColors(sphere) {
  if (sphere.material instanceof THREE.RawShaderMaterial) {
    const decPairs = createDecPairs();
    sphere.material.uniforms.rgb1.value = new THREE.Vector3(
      decPairs[getRandomIndex()] / 255,
      decPairs[getRandomIndex()] / 255,
      decPairs[getRandomIndex()] / 255
    );
    sphere.material.uniforms.rgb2.value = new THREE.Vector3(
      decPairs[getRandomIndex()] / 255,
      decPairs[getRandomIndex()] / 255,
      decPairs[getRandomIndex()] / 255
    );
  }
}

// 노말행렬 계산
function setNormalMatrix(sphere) {
  if (sphere.material instanceof THREE.RawShaderMaterial) {
    // Object3D.matrixWorld 는 해당 오브젝트의 버텍스들에 적용되는 모델행렬이라고 보면 됨.
    // 해당 오브젝트에 이동, 회전, 스케일 변환을 적용했을 때, matrixWorld를 업데이트해줘야 모델행렬에도 반영됨.
    sphere.updateMatrixWorld(true);

    const normalMatrix = new THREE.Matrix3(); // 3*3 단위행렬 생성
    normalMatrix.setFromMatrix4(
      sphere.matrixWorld.clone().invert().transpose() // 모델행렬의 역행렬의 전치행렬을 구한 뒤, 상단 3*3 요소들만 저장함.
    );

    sphere.material.uniforms.customNormalMatrix.value = normalMatrix; // 유니폼 변수에 모델행렬 전송
  }
}

function createDecPairs() {
  const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + j * 2, 4 + j * 2));
  }
  const decPairs = hashPairs.map((x) => {
    return parseInt(x, 16);
  });
  return decPairs;
}

function getRandomIndex() {
  const randomInt = Math.round(Math.random() * (32 - 0) + 0);
  return randomInt;
}
