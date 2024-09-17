import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const CartRef = useRef();
  const [selectedSize, setSelectedSize] = useState(null);
  // destructure the values from the state context
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    Remove,
  } = useStateContext();

  const handleCheckout = async () => {
     // Check if a size is selected
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    try {
      // Prepare line items for the checkout
      const lineItems = cartItems.map((item) => ({
        name: `${item.name} - Size: ${selectedSize}`,
        price: item.price,
        quantity: item.quantity,
      }));

      // Send a POST request to the server for checkout
      const response = await axios.post("http://localhost:3001/api/server", {
        line_items: lineItems,
      });

      const { data } = response;
      if (data && data.id) {
        // Redirect to the checkout URL
        window.location = data.url;

        // Show a success message
        toast.success("Thank you for your purchase!", {
          autoClose: 4000,
        });
      } else {
        console.error("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update the selected size state
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className="cart-wrapper" ref={CartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your List</span>
          <span className="cart-num-items">{totalQuantities} NIKEZ</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Bag Is Emty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/*call the items with the id*/}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                {item?.image && item.image.length > 0 && (
                  <img
                    src={urlFor(item?.image[0]).url()}
                    alt=""
                    className="cart-product-image"
                  />
                )}
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <div className="sizesCart">
                      <select value={selectedSize} onChange={handleSizeChange}>
                        <option value="">Add Your Size</option>
                        {item.sizes.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h4>{item.price}DT</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => Remove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Total:</h3>
                <h3>{totalPrice}DT</h3>
                <div className="btn-container">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleCheckout}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
