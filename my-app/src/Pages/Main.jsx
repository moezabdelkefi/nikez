import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SavedCardList from "../components/SavedCardList";
import Product from "../components/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModelViewer from "../components/Logo3d";
import Banner from "../components/HeroBanner";

const Main = () => {
  return (
    <div className="Content-Container">
      <ToastContainer />
      <NavBar />
      <ModelViewer
        scale="750"
        modelPath={"/logooo.glb"}
        style={{ pointerEvents: "none" }}
      />
      <div>
        <SavedCardList />
      </div>
      <Banner />
      <Product />
      <Footer />
    </div>
  );
};

export default Main;
