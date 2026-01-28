import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

async function isAdmin(uid) {
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";

  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);

    const ok = await isAdmin(cred.user.uid);
    if (!ok) {
      msg.textContent = "このアカウントは Admin 権限がありません。";
      return;
    }

    location.href = "score-list.html";
  } catch (err) {
    msg.textContent = "ログイン失敗: " + err.message;
  }
});
