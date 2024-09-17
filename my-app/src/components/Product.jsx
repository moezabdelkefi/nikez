import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../lib/client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useStateContext } from "../context/StateContext";
import "../Styles/SavedCard.css";
import { toast, Toaster } from "react-hot-toast";

SwiperCore.use([Navigation]);

const Product = () => {
  const { onAdd, cartItems } = useStateContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from sanity(cms)
    const fetchData = async () => {
      try {
        const result = await client.fetch('*[_type == "product"]');
        setProducts(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  // Add the product to the cart
  const addToCart = (product) => {
    onAdd(product, 1);
  // Get the quantity of the added product in the cart
    const quantity = getQuantity(product);
  // Show a success toast message with the added quantity and product name
    toast.success(`${quantity} ${product.name} Added To The Cart.`);
  };

  // Find the cart item corresponding to the product
  const getQuantity = (product) => {
    const cartItem = cartItems.find((item) => item._id === product._id);
  // Return the quantity of the cart item if found, otherwise return 1
    return cartItem ? cartItem.quantity : 1;
  };

  // Display a loading message if the products are still being fetched
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="swipe">
      <h2>New Arrival</h2>
      <Toaster />
      <Swiper
        navigation
        slidesPerView={4}
        spaceBetween={25}
        style={{ padding: "20px" }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          639: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="snip14188">
              <Link to={`/product/${product._id}`}>
                <img
                  src={urlFor(product.image[0]).url()}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="img"
                />
                <h2>{product.name}</h2>
              </Link>
              <button
                data-text="Awesome"
                className="button"
                onClick={() => addToCart(product)}
              >
                <span className="actual-text" style={{ cursor: "pointer" }}>
                  &nbsp;Go Add&nbsp;
                </span>
                <span
                  className="hover-text"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                >
                  &nbsp;cart&nbsp;
                </span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
