import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "logged in as " + user.email,
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location = "./todo.html";
      }, 2000);
      // ...
    })
    .catch(async (error) => {
      await Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Not an Account ",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location = "./signup.html";
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
