
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqDflmmZ-GdGLw6VG2nhWsqk5GDRh8WpE",
  authDomain: "olx-clone-3ec0a.firebaseapp.com",
  projectId: "olx-clone-3ec0a",
  storageBucket: "olx-clone-3ec0a.appspot.com",
  messagingSenderId: "989346871515",
  appId: "1:989346871515:web:e14d2a1d1e601794fd34fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app