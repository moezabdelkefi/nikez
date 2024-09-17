import React from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase";
import { useState } from "react";
import "../Styles/Style.scss";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import "../Styles/Menu.css";
import { Link as ScrollLink } from "react-scroll";

const NavBar = () => {
  const user = auth.currentUser;
  const AdminId = "VFDBZoqI6Ehi4nAF5aauCVOK4P52";
  let userId;

  if (user) {
    userId = user.uid;
    // Do something with the user ID
  }

  // Handle Add Item button click
  const handleAddItem = () => {
    window.location.href = "https://sanity-project-iota.vercel.app/";
  };

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  // Animation variants for menu items
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("current user");

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("current user");
        window.location.href = "/Main";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Navigate to login page
  const navigateToLogin = () => {
    window.location.href = "/Login";
  };

  // Navigate to sign up page
  const navigateToSignUp = () => {
    window.location.href = "/SignUp";
  };

  // Additional state and variants for menu animation
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navItems">
        <a href="/Main">
          <img className="LogoImage" src={Logo} alt="" />
        </a>
        <div className="Ulcontainer">
          <ul className="NavUl">
            <li className="LiNav">
              {" "}
              <a
                href="/Main"
                onClick={() => {
                  window.location.href = "/Main";
                }}
              >
                Home
              </a>
            </li>
            <li className="LiNav">
              <a
                href="/Design"
                onClick={() => {
                  window.location.href = "/Design";
                }}
              >
                Design
              </a>{" "}
            </li>
            <li className="LiNav">
              <a href="/Footer">
                <ScrollLink to="footer" smooth={true} duration={500}>
                  Contact Us
                </ScrollLink>
              </a>{" "}
            </li>
            <li className="LiNav">
              <a
                href="/about"
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showCart && <Cart />}
      <div className="LoginSignup">
        <div>
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
        {!isLoggedIn ? (
          <div className="ButtonsLS">
            <button className="Login" onClick={navigateToLogin}>
              Log In
            </button>
            <button className="Signup" onClick={navigateToSignUp}>
              Sign Up
            </button>
          </div>
        ) : (
          <div className="userContainer">
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="menu"
            >
              <motion.button
                className="menuButton"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                Menu
                <motion.div
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <motion.ul
                variants={{
                  open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
                className="menuDrop"
              >
                <motion.li
                  onClick={() => {
                    window.location.href = "/MyShoes";
                  }}
                  variants={itemVariants}
                  className="menuDropLi"
                >
                  My Shoes{" "}
                </motion.li>
                {AdminId === userId && (
                  <motion.li
                    variants={itemVariants}
                    className="menuDropLi"
                    onClick={handleAddItem}
                  >
                    Add Item
                  </motion.li>
                )}
                <motion.li
                  onClick={handleSignOut}
                  variants={itemVariants}
                  className="menuDropLi"
                >
                  Sign Out{" "}
                </motion.li>
              </motion.ul>
            </motion.nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
