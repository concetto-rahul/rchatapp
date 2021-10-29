import { initializeApp } from "@firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDa5w0iEcm2g1z1MKuFzSkRKZMz3trPTXc",
    authDomain: "my-1st-app-46faa.firebaseapp.com",
    projectId: "my-1st-app-46faa",
    storageBucket: "my-1st-app-46faa.appspot.com",
    messagingSenderId: "691850958008",
    appId: "1:691850958008:web:427ad46173eb71955ad04d",
    measurementId: "G-DSK1F96KCL"
});
export const auth=getAuth();
export const db = getFirestore();
export const storage = getStorage(firebaseApp);