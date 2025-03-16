// import firebase from "firebase/compat/app";
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBJLTDDIul75bEvYRNFS8I38_x_jJU0x7A",
//   authDomain: "challenge-51632.firebaseapp.com",
//   projectId: "challenge-51632",
//   storageBucket: "challenge-51632.firebasestorage.app",
//   messagingSenderId: "496964152775",
//   appId: "1:496964152775:web:9363196e048784800dfde2",
//   measurementId: "G-53377MD7TE"
// };

// const firebaseApp=firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export{db,auth};

// Import Firebase and necessary modules
import firebase from "firebase/compat/app";
import "firebase/compat/auth";       // ✅ Import Authentication
import "firebase/compat/firestore";   // ✅ Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJLTDDIul75bEvYRNFS8I38_x_jJU0x7A",
  authDomain: "challenge-51632.firebaseapp.com",
  projectId: "challenge-51632",
  storageBucket: "challenge-51632.appspot.com", // ✅ Corrected Storage Bucket
  messagingSenderId: "496964152775",
  appId: "1:496964152775:web:9363196e048784800dfde2",
  measurementId: "G-53377MD7TE"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

// Export the services
export { db, auth };
