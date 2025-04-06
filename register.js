// register.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const message = document.getElementById("register-message");

  message.innerText = "";

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user)
        .then(() => {
          message.style.color = "green";
          message.innerText = "Verification email sent. Please check your inbox before logging in.";
          document.getElementById("register-form").reset();
        })
        .catch((error) => {
          console.error("Verification email error:", error.message);
          message.innerText = "Failed to send verification email.";
        });
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      message.innerText = error.message;
    });
});