import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALP7t_Yviu1Cvmzg8sqmlQMJPYPqgFF-U",
  authDomain: "bolsitas-5a421.firebaseapp.com",
  projectId: "bolsitas-5a421",
  storageBucket: "bolsitas-5a421.appspot.com",
  messagingSenderId: "861607810077",
  appId: "1:861607810077:web:e77ab47a5529e3a645a2f4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
