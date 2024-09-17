import React, { useRef, Suspense, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import { OrbitControls } from "@react-three/drei";
import "../Styles/Shoes3D.css";
import "../Styles/cart.css";
import NavBar from "../components/NavBar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../components/Footer";
import { Toaster, toast } from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51NFb0NHo0XtniAaJpxVNhZDfQyET3wo8u6fTsbrcjIUxAOGk37SnIrLJ5hE7TxhvJJhmeCiX1NrUjRjFG6KdOjU800EmkQ9iLC"
);

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
  const pivot = useRef(new THREE.Object3D());
  const [rotation, setRotation] = useState(0);

  // Use the useFrame hook to update the rotation on each frame
  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Calculate the new rotation values for circular motion
    const radius = 1;
    const speed = 1;

    // Calculate the angle based on elapsed time and speed
    const angle = elapsedTime * speed;

    // Calculate the x and z coordinates within the circular range
    const y = Math.sin(angle) * radius;

    // Apply the new position to the pivot
    pivot.current.position.y = y;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the rotation value to rotate or spin the model
      setRotation((rotation) => rotation + 0.01);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, []); // Run the effect only once on mount

  return (
    <group ref={pivot} position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
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
const Shoe3D = () => {
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);
  const { colorDictionary } = location.state;
  useEffect(() => {
    console.log(colorDictionary);
  }, [colorDictionary]);

  const handleShare = (platform) => {
    const url = window.location.protocol + "//" + window.location.hostname;

    // Create a dynamic share message based on the platform
    let shareMessage = "";
    if (platform === "facebook") {
      shareMessage = `Check out this awesome product on Facebook: ${url}`;
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?href=${encodeURIComponent(
        url
      )}`;

      // Open Facebook share dialog in a new window
      window.open(facebookShareUrl, "_blank", "width=600,height=400");
    } else if (platform === "twitter") {
      shareMessage = `Check out this awesome product on Twitter: ${url}`;
      const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareMessage
      )}`;

      window.open(twitterShareUrl, "_blank", "width=600,height=300");
    } else if (platform === "instagram") {
      shareMessage = `Check out this awesome product on Instagram: ${url}`;

      window.location.href = `instagram://share?text=${encodeURIComponent(
        shareMessage
      )}`;

      setTimeout(() => {
        window.location.href = `https://www.instagram.com/?hl=en`;
      }, 1000);
    }
  };

  const reviews = [
    { id: 1, name: "John", rating: 4, comment: "Great product!" },
    { id: 2, name: "Jane", rating: 4, comment: "Highly recommended!" },
  ];

  const handleBuyNow = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const stripe = await stripePromise;

    const sessionResponse = await fetch("http://localhost:3001/api/server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_id: "price_1NKQcPHo0XtniAaJRRhNxP92",
        metadata: {
          size: selectedSize,
        },
      }),
    });
    const sessionData = await sessionResponse.json();

    const { session_id } = sessionData;

    const successUrl = "http://localhost:3000/";

    const result = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_1NKQcPHo0XtniAaJRRhNxP92", quantity: 1 }],
      mode: "subscription",
      sessionId: session_id,
      successUrl: successUrl,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const sizes = [40, 41, 42, 43, 44];

  return (
    <>
      <div>
        <NavBar />
        <div className="card">
          <Toaster />
          <h2>{colorDictionary.shoeName}</h2>
          <div className="sizes">
            <select
              value={selectedSize}
              onChange={(e) => handleSizeSelection(e.target.value)}
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="social-buttons">
            <h3>Share:</h3>
            <button onClick={() => handleShare("facebook")}>
              <FaFacebook />
            </button>
            <button onClick={() => handleShare("twitter")}>
              <FaTwitter />
            </button>
            <button onClick={() => handleShare("instagram")}>
              <FaInstagram />
            </button>
          </div>
          <div className="customer-reviews">
            <h4>Customer Reviews:</h4>
            {reviews.map((review) => (
              <div key={review.id} className="review">
                <h2>{review.name}</h2>
                <h2>
                  Rating: {review.rating}
                  <i className="far fa-star fa-bounce fa-2xs"></i>
                  <i className="far fa-star fa-bounce fa-2xs"></i>
                  <i className="far fa-star fa-bounce fa-2xs"></i>
                  <i className="far fa-star fa-bounce fa-2xs"></i>
                </h2>
                <h3>{review.comment}</h3>
              </div>
            ))}
            <div>
              <h3>150DT</h3>
            </div>
            <div>
              <button
                data-text="Awesome"
                className="button"
                onClick={handleBuyNow}
              >
                {" "}
                <span className="actual-text" style={{ cursor: "pointer" }}>
                  &nbsp;Buy NoW&nbsp;
                </span>
                <span
                  className="hover-text"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                >
                  &nbsp;Nikez&nbsp;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-Container">
        <Canvas dpr={[1, 2]} camera={{ position: [6, 0, 0] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} />
          <Suspense fallback={null}>
            <Shoes colorDictionary={colorDictionary} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <Footer />
    </>
  );
};
export default Shoe3D;
