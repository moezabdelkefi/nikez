import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import auth from "../firebase.js";
import SavedCard from "../components/SavedCard";
import "../Styles/MyShoes.css";

function MyShoes() {
  const [colorDictionaries, setColorDictionaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, "color-dictionaries");
        const docsSnap = await getDocs(colRef);

        const dictionaries = [];
        docsSnap.forEach((doc) => {
          dictionaries.push(doc.data());
        });

        setColorDictionaries(dictionaries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error retrieving color dictionaries: ", error);
      }
    };

    fetchData();
  }, []);
  const currentUser = auth.currentUser;

  if (currentUser) {
    const CurrentId = currentUser.uid;
    console.log(CurrentId);
  } else {
    console.log("No user is currently signed in.");
  }
  return (
    <div>
      <NavBar />
      <div className="snip141887">
        {colorDictionaries.map((dictionary, idx) => {
          if (dictionary.userId === currentUser.uid) {
            return (
              <SavedCard colorDictionary={dictionary} className="MyShoe" />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default MyShoes;
