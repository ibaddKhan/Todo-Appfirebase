import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);

      Swal.fire({
        title: "Registration Successful",
        text: "You have successfully registered!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location = "./todo.html";
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

      Swal.fire({
        title: "Registration Error",
        text: errorMessage,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    });
});
