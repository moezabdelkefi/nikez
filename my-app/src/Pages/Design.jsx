import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { proxy, useSnapshot } from "valtio";
import { HexColorPicker } from "react-colorful";
import "../Styles/Design.css";
import * as THREE from "three";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const state = proxy({
  current: null,
  items: {
    TheEntireShoes: "#ffffff",
    Laces006: "#ffffff",
    Nike_Logo_right001: "#ffffff",
    Ticket: "#ffffff",
    Shoe_Flap002: "#ffffff",
    BackOftheShoes: "#ffffff",
    TheFrontOfTheShoes: "#fffffff",
    BottomOfTheShoes: "#ffffff",
    theFrontFromINside: "#ffffff",
    BackLeftAndRight: "#ffffff",
  },
});

function Picker() {
  const isLoggedIn = !!localStorage.getItem("current user"); // Checks if a user is logged in by checking the presence of "current user" in local storage
  const [selectedItem, setSelectedItem] = useState(null); // State variable to track the selected item
  const [loader, setLoader] = useState(false); // State variable to track the loading state
  const [Done, setDone] = useState(false); // State variable to track the "Done" state
  const snap = useSnapshot(state); // Retrieves a snapshot of the state
  const count = useMotionValue(0); // Motion value for counting
  const rounded = useTransform(count, Math.round); // Rounded motion value
  const auth = getAuth(); // Firebase authentication instance
  const currentUser = auth.currentUser; // Current user object
  const userId = currentUser ? currentUser.uid : ""; // User ID obtained from the current user object or empty string
  const db = getFirestore(); // Firebase Firestore instance

  // Redirects to "/Main" if the "Done" state is true
  useEffect(() => {
    if (Done) {
      window.location.href = "/Main";
    }
  }, [Done]);

  // Handles color change for a specific key in the state
  const handleColorChange = (key, color) => {
    state.items[key] = color;
  };

  // Toggles the selected item by setting its position
  const handleItemClick = (key) => {
    const selectedPosition = key === selectedItem ? null : key;
    setSelectedItem(selectedPosition);
  };

  // Handles color input change for a specific key in the state
  const handleColorInputChange = (key, event) => {
    state.items[key] = event.target.value;
  };

  // Handles shoe name change in the state
  const handleShoeNameChange = (event) => {
    state.shoeName = event.target.value;
  };

  const handleSave = async () => {
    // Trims the shoe name from the state
    const shoeName = state.shoeName?.trim();

    // Displays an error message if the shoe name is empty
    if (!shoeName) {
      toast.error("Please enter a shoe name");
      return;
    }

    setLoader(true);
    const animation = animate(count, 100, { duration: 3 });
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);

    // Constructs the color dictionary object
    const colorDictionary = {
      userId: userId,
      shoeName: state.shoeName,
      creationDate: formattedDate,
      ...snap.items,
    };

    if (isLoggedIn) {
      try {
        const existingDictionary = await getExistingDictionary(
          userId,
          state.shoeName
        ); // Retrieves the existing dictionary for the current user and shoe name

        if (existingDictionary) {
          toast.error(
            "You have already created this shoe before. Please enter a unique name."
          ); // Displays an error message if the dictionary already exists
          setLoader(false);
          return animation.stop;
        }

        const docRef = await addDoc(
          collection(db, "color-dictionaries"),
          colorDictionary
        ); // Adds the color dictionary to the Firestore collection
        console.log("Color dictionary saved with ID: ", docRef.id);
        toast.success("Created successfully");
        setLoader(false);
        setDone(true);
        return animation.stop;
      } catch (error) {
        console.error("Error saving color dictionary: ", error);
      }
    } else {
      if (!isLoggedIn) {
        // Saves the color dictionary to local storage if the user is not logged in
        localStorage.setItem("savedData", JSON.stringify(snap.items));
        window.location.href = "/Login"; // Redirects to "/Login"
        return;
      }
    }
  };

  async function getExistingDictionary(userId, shoeName) {
    const querySnapshot = await getDocs(collection(db, "color-dictionaries"));
    const existingDictionary = querySnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.userId === userId && data.shoeName === shoeName;
    }); // Finds the existing dictionary based on the user ID and shoe name

    return existingDictionary;
  }

  return loader ? (
    <motion.h1>{rounded}</motion.h1>
  ) : (
    <div className="slider">
      <input
        type="text"
        placeholder="Add Your Shoe Name"
        value={state.shoeName}
        onChange={handleShoeNameChange}
        className="Name"
      />
      {Object.entries(snap.items).map(([key, color]) => (
        <div key={key} className="input">
          <button
            className={`item-button ${
              selectedItem === key ? "active" : ""
            } ${key}`}
            onClick={() => handleItemClick(key)}
          >
            {key}
          </button>
          {selectedItem === key && (
            <>
              <div className="picker-container">
                <div
                  className="picker-color"
                  style={{ backgroundColor: color }}
                  onClick={() => handleItemClick(key)}
                />
                <div className="picker-overlay">
                  <HexColorPicker
                    color={color}
                    onChange={(newColor) => handleColorChange(key, newColor)}
                  />
                </div>
              </div>
              <input
                className="color-input"
                type="text"
                value={color}
                onChange={(event) => handleColorInputChange(key, event)}
              />
            </>
          )}
        </div>
      ))}
      <div className="SaveButton">
        <button
          data-text="Awesome"
          className="DesignButton"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

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
  const { nodes, materials } = useGLTF("/AirComp.glb");
  const pivot = useRef(new THREE.Object3D());

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

export default function Design() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="Design-Page">
        <div className="Container-Buttons">
          <Picker />
        </div>
        <div className="canvas-container" id="design-container">
          <div className="Cyrcle">
            <Canvas className="Canvas-Design">
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[10, 10, 20]} />

              <Suspense fallback={null}>
                <Shoes className="ModelDesign" />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
