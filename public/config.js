import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbsq5lAY33EIi_REm4E3uJZImn8uli1Fk",
  authDomain: "todo-ibad.firebaseapp.com",
  projectId: "todo-ibad",
  storageBucket: "todo-ibad.appspot.com",
  messagingSenderId: "869245636789",
  appId: "1:869245636789:web:1a4e92c88f366933ec6efc",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
