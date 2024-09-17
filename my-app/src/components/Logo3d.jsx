import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BigShoes from "./BigShoes";
import "../Styles/Nikez.css";
import "../Styles/ShoesContainer.css";

const ModelViewer = ({ modelPath, scale = 100, position = [0, 0, 0.8] }) => {
  // Redirect to the Design page
  const moveDesign = () => {
    window.location.href = "/Design";
  };
  return (
    <div className="front-Container">
      <div className="Model-Container">
        <Canvas className="NikezModel" style={{ width: "100%", height: "60%" }}>
          <ambientLight intensity={0.7} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <Suspense fallback={null}>
            <BigShoes modelPath={modelPath} scale={scale} position={position} />
            <OrbitControls enableZoom={false} enableRotate={false} />
          </Suspense>
        </Canvas>
        <div className="shoeM"></div>
      </div>
      <div className="text-container">
        <div className="Text">
          <div>
            <p>
              We're all have the problem of buying the same shoe as our friends
              so why doesn't we chose our own colors to touch the perfection
            </p>
          </div>
        </div>
        <button className="CustimizeBTN" onClick={moveDesign}>
          Create Your Own Style
        </button>
      </div>
    </div>
  );
};

export default ModelViewer;
