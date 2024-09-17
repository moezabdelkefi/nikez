import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SavedCard from "./SavedCard";
import "../Styles/SavedCard.css";

SwiperCore.use([Navigation, Pagination]);

const SavedCardList = () => {
  const [colorDictionaries, setColorDictionaries] = useState([]); // State to hold the color dictionaries
  const [isLoading, setIsLoading] = useState(true); // State to track the loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, "color-dictionaries");
        const docsSnap = await getDocs(colRef);

        // Retrieves the color dictionaries from the Firestore collection
        const dictionaries = [];
        docsSnap.forEach((doc) => {
          dictionaries.push(doc.data());
        });

        // Sets the color dictionaries in the state
        setColorDictionaries(dictionaries);
        setIsLoading(false); // Marks the loading as complete
        // Logs an error if there is an issue retrieving the color dictionaries
      } catch (error) {
        console.error("Error retrieving color dictionaries: ", error);
      }
    };

    fetchData();
  }, []);
  // Displays a loading indicator while the data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Displays a message if no color dictionaries are available
  if (colorDictionaries.length === 0) {
    return <div>No color dictionaries found.</div>;
  }

  return (
    <div className="swipe">
      <h2>Find Out What Other Styles You Can Wear </h2>
      <Swiper
        style={{ padding: "20px" }}
        navigation
        slidesPerView={4}
        spaceBetween={25}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          375: {
            slidesPerView: 1,
          },

          639: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 4,
          },
          2560: {
            slidesPerView: 5,
          },
        }}
      >
        {colorDictionaries.map((dictionary, idx) => (
          <SwiperSlide key={idx}>
            <div>
              <SavedCard colorDictionary={dictionary} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SavedCardList;
