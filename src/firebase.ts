import firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore"
import "firebase/compat/database";
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY ,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;
export const auth=getAuth(app)