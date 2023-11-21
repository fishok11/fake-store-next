// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlJob8_Td_5UBCe0mB30xnRJN-BYlf2MU",
  authDomain: "fake-store-627a3.firebaseapp.com",
  projectId: "fake-store-627a3",
  storageBucket: "fake-store-627a3.appspot.com",
  messagingSenderId: "124861340151",
  appId: "1:124861340151:web:ea6c57f51fdab48b1e76f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) 
 
export default db;