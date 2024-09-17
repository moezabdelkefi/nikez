import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import * as THREE from "three";
import "../Styles/Nikez.css";
import { useFrame } from "@react-three/fiber";

const state = proxy({
  items: {
    TheEntireShoes: "#ffffff",
    Laces006: "#000000",
    Nike_Logo_right001: "#ffffff",
    Ticket: "#000000",
    Shoe_Flap002: "#ffffff",
    BackOftheShoes: "#ffffff",
    TheFrontOfTheShoes: "#000000",
    BottomOfTheShoes: "#ffffff",
    theFrontFromINside: "#ffffff",
    BackLeftAndRight: "#000000",
  },
});

function Mesh(props) {
  const snap = useSnapshot(state);
  const { geometry, material, color, ...rest } = props;

  return (
    <mesh geometry={geometry} material={material} {...rest}>
      <meshStandardMaterial attach="material" color={snap.items[color]} />
    </mesh>
  );
}

function Shoes(props) {
  const { nodes, materials } = useGLTF("/AirComp.glb"); // Load 3D model using useGLTF hook
  const pivot = useRef(new THREE.Object3D()); // Create a ref for the pivot
  const [rotation, setRotation] = useState(0); // State to track rotation value

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    const radius = 1;
    const speed = 1;
    const angle = elapsedTime * speed;

    const y = Math.sin(angle) * radius;
    pivot.current.position.y = y;
  });

  // Increment rotation value by 0.01
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((rotation) => rotation + 0.01);
    }, 1);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Run the effect only once on mount3

  return (
    <group ref={pivot} position={[4, 0, 0]} rotation={[0.8, 0, 0]}>
      <Mesh
        geometry={nodes.BackLeftAndRight.geometry}
        material={materials["default"]}
        color="BackLeftAndRight"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.BackOftheShoes.geometry}
        material={materials["default"]}
        color="BackOftheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.BottomOfTheShoes.geometry}
        material={materials["default"]}
        color="BottomOfTheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.Laces.geometry}
        material={materials["default"]}
        color="Laces006"
        className="shoe-mesh"
        position={[-4.42, 0.97, 0.72]}
        rotation={[-0.68, 1.53, 1.15]}
        scale={[8.56, 8.56, 8.56]}
      />
      <Mesh
        geometry={nodes.Nike_Logo_right.geometry}
        material={materials["default"]}
        color="Nike_Logo_right001"
        className="shoe-mesh"
        position={[-5.05, 0.83, -1.87]}
        rotation={[-Math.PI, 1.55, -Math.PI]}
        scale={[8.38, 8.38, 8.38]}
      />
      <Mesh
        geometry={nodes.Shoe_Flap.geometry}
        material={materials["default"]}
        color="Shoe_Flap002"
        className="shoe-mesh"
        position={[-4.42, 0.52, -0.24]}
        rotation={[-2.09, 1.42, -0.94]}
        scale={[-6.8, -6.8, -6.8]}
      />
      <Mesh
        geometry={nodes.TheEntireShoes.geometry}
        material={materials["default"]}
        color="TheEntireShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.theFrontFromINside.geometry}
        material={materials["default"]}
        color="theFrontFromINside"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.TheFrontOfTheShoes.geometry}
        material={materials["default"]}
        color="TheFrontOfTheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
      />
      <Mesh
        geometry={nodes.Ticket.geometry}
        material={materials["default"]}
        color="Ticket"
        className="shoe-mesh"
        position={[-4.41, 0.21, -0.01]}
        rotation={[0, 1.51, 0]}
        scale={[8.82, 8.82, 8.82]}
      />
    </group>
  );
}
export default function Shoesy() {
  return (
    <>
      <div className="Canvas-Shoe">
        <Canvas
          className="CanvasShoe"
          dpr={[1, 2]}
          camera={{ position: [4, 0, 0] }}
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
            marginTop: "40px",
            paddingTop: "50px",
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[10, 10, 20]} />

          <Suspense fallback={null}>
            <Shoes />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
    </>
  );
}
