import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// あなたの Firebase プロジェクト設定
const firebaseConfig = {
  apiKey: "AIzaSyDbg4jDyIewLZ2AfzE5kZu-IPUgnlvdwCo",
  authDomain: "hiringproject-4ab76.firebaseapp.com",
  projectId: "hiringproject-4ab76",
  storageBucket: "hiringproject-4ab76.appspot.com",
  messagingSenderId: "964692026159",
  appId: "1:964692026159:web:4dfdbf7a3c7a635bdeb7da",
  measurementId: "G-K4C6BJR3MV"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app);

export { app, db, storage,auth };

