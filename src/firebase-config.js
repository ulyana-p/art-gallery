import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD5_sBLTPmZnBkagmviy1OE31soiwFVmKI",
  authDomain: "fir-art-gallery.firebaseapp.com",
  projectId: "fir-art-gallery",
  storageBucket: "fir-art-gallery.appspot.com",
  messagingSenderId: "1055149743152",
  appId: "1:1055149743152:web:400a789b6f2a4e67d161f5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)