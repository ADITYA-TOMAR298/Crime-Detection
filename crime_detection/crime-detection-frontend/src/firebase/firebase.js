import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGA-G9gn1KFSs17y8AMwYfHfxgIcxVyDA",
  authDomain: "crime-detection-ai.firebaseapp.com",
  projectId: "crime-detection-ai",
  storageBucket: "crime-detection-ai.firebasestorage.app",
  messagingSenderId: "899858307503",
  appId: "1:899858307503:web:60c67e727c2a5d609f375a",
  measurementId: "G-0SJ72GSE5R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();