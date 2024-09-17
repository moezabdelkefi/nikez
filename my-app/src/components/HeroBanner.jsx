import React, { useState, useEffect } from "react";
import { client } from "../lib/client";
import "../Styles/globals.css";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    // Fetch banner data from Sanity CMS
    const query = `*[_type == "banner"]{
      image {
        asset {
          _id,
          url
        }
      },
      buttonText,
      product,
      desc,
      smallText,
      midText,
      largeText1,
      largeText2,
      discount,
      saleTime
    }`;

    client
      .fetch(query)
      .then((data) => {
        // Set the fetched banner data in the component state
        setBannerData(data);
      })
      .catch((error) => {
        console.error("Error fetching banner data:", error);
      });
  }, []);

  return (
    <div className="footer-banner-container">
      {bannerData.map((banner, index) => (
        <div key={index}>
          <div className="banner-desc">
            <div className="left">
              <p>{banner.discount}</p>
              <h3>{banner.largeText1}</h3>
              <p>{banner.saleTime}</p>
            </div>
            <div className="right">
              <p>{banner.smallText}</p>
              <h3>{banner.midText}</h3>
              <p>{banner.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
