import React, { useRef, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "../Styles/SavedCard.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function Mesh({ colorDictionary, ...props }) {
  const { geometry, material, color, ...rest } = props;

  return (
    <mesh geometry={geometry} material={material} {...rest}>
      <meshStandardMaterial attach="material" color={colorDictionary[color]} />
    </mesh>
  );
}

function Shoes({ colorDictionary }) {
  const { nodes, materials } = useGLTF("/AirComp.glb");
  // Create a ref for the pivot
  const pivot = useRef(new THREE.Object3D());

  return (
    <group
      ref={pivot}
      position={[4, 0, 0]}
      rotation={[0.8, 0, 0]}
      scale={[1, 2, 2]}
    >
      <Mesh
        geometry={nodes.BackLeftAndRight.geometry}
        material={materials["default"]}
        color="BackLeftAndRight"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.BackOftheShoes.geometry}
        material={materials["default"]}
        color="BackOftheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.BottomOfTheShoes.geometry}
        material={materials["default"]}
        color="BottomOfTheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.Laces.geometry}
        material={materials["default"]}
        color="Laces006"
        className="shoe-mesh"
        position={[-4.42, 0.97, 0.72]}
        rotation={[-0.68, 1.53, 1.15]}
        scale={[8.56, 8.56, 8.56]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.Nike_Logo_right.geometry}
        material={materials["default"]}
        color="Nike_Logo_right001"
        className="shoe-mesh"
        position={[-5.05, 0.83, -1.87]}
        rotation={[-Math.PI, 1.55, -Math.PI]}
        scale={[8.38, 8.38, 8.38]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.Shoe_Flap.geometry}
        material={materials["default"]}
        color="Shoe_Flap002"
        className="shoe-mesh"
        position={[-4.42, 0.52, -0.24]}
        rotation={[-2.09, 1.42, -0.94]}
        scale={[-6.8, -6.8, -6.8]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.TheEntireShoes.geometry}
        material={materials["default"]}
        color="TheEntireShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.theFrontFromINside.geometry}
        material={materials["default"]}
        color="theFrontFromINside"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.TheFrontOfTheShoes.geometry}
        material={materials["default"]}
        color="TheFrontOfTheShoes"
        className="shoe-mesh"
        position={[-4.38, 0.3, -0.01]}
        rotation={[0, 1.54, 0]}
        scale={[8.34, 8.34, 8.34]}
        colorDictionary={colorDictionary}
      />
      <Mesh
        geometry={nodes.Ticket.geometry}
        material={materials["default"]}
        color="Ticket"
        className="shoe-mesh"
        position={[-4.41, 0.21, -0.01]}
        rotation={[0, 1.51, 0]}
        scale={[8.82, 8.82, 8.82]}
        colorDictionary={colorDictionary}
      />
    </group>
  );
}

const SavedCard = ({ colorDictionary }) => {
  const navigate = useNavigate();
  const CardData = () => {
    const Data = colorDictionary;
    console.log(Data);
    navigate("/Shoe3D", { state: { colorDictionary } });
  };

  return (
    <div className="SavedCard" onClick={CardData}>
      <div id="circle">
        <div className="canvas-wrapper">
          <div className="description">
            <div className="name">
              <h2 className="ShoeName">{colorDictionary.shoeName}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Canvas dpr={[1, 2]} camera={{ position: [6, 0, 0] }}>
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
          <Suspense fallback={null}>
            <Shoes colorDictionary={colorDictionary} />
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} />
        </Canvas>
        <p className="Link">More</p>
      </div>
    </div>
  );
};

export default SavedCard;
