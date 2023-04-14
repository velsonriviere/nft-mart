// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries'

// Your web app's Firebase configuration
// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyCBask4ik8EUchtXc79TBfhtRTusMxEr0Q",
    authDomain: "nft-uploads-37f1d.firebaseapp.com",
    projectId: "nft-uploads-37f1d",
    storageBucket: "nft-uploads-37f1d.appspot.com",
    messagingSenderId: "871581225112",
    appId: "1:871581225112:web:492c22a82f4c2333e640ed",
});

const Storage = getStorage(app);

export default Storage;
