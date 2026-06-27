"use client";

import { useGLTF, Float } from "@react-three/drei";

export default function Sneaker3D() {
  // Carrega um modelo 3D real (neste caso, um Nike hospedado publicamente para testes)
  // Quando quiser usar o seu, mude para: useGLTF("/models/seu-tenis.glb")
  const { scene } = useGLTF(
    "/models/sneaker.glb"
  );

  return (
    <Float 
      speed={2.5} 
      rotationIntensity={0.6} 
      floatIntensity={1.2} 
      floatingRange={[-0.1, 0.1]}
    >
      <primitive
        object={scene}
        scale={1.8} // Ajuste o tamanho do tênis aqui
        position={[0, -0.2, 0]}
        rotation={[0.2, Math.PI * 1.2, 0]} // Rotação inicial para mostrar o melhor ângulo
      />
    </Float>
  );
}

// Fazer o pré-carregamento do modelo evita que a tela pisque em branco
useGLTF.preload("/models/sneaker.glb");
