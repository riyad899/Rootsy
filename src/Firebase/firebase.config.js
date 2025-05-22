// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUy9NAaqBwRK1SMTUZJntWVWH_4FzqH7c",
  authDomain: "rootsy-project.firebaseapp.com",
  projectId: "rootsy-project",
  storageBucket: "rootsy-project.firebasestorage.app",
  messagingSenderId: "224923721896",
  appId: "1:224923721896:web:183ae1d5f6ad046346e29d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;