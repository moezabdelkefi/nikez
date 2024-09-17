// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { initializeApp } from 'firebase-admin/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzMgKVIM9n8kylOCOYbP6a7jeDze1iFFk",
  authDomain: "pfa-poject.firebaseapp.com",
  projectId: "pfa-poject",
  storageBucket: "pfa-poject.appspot.com",
  messagingSenderId: "809559896385",
  appId: "1:809559896385:web:814bb3d4e640b7b97071c0",
  measurementId: "G-1D8KPRXW73"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;