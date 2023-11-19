import { db, auth } from "./config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  where,
  doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

let Array = [];
const input = document.querySelector("#todo-val");
const div = document.querySelector(".todo-list");
const btn = document.querySelector("#btn");
const form = document.querySelector("form");

btn.addEventListener("click", () => {
  signOut(auth)
    .then(async () => {
      console.log("loggedout");
      await Swal.fire({
        title: "Logged Out",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location = "./index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    render(uid);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log(input.value);
      if (input.value === "") {
        Swal.fire({
          title: "Enter A Task",
          icon: "error",
          showConfirmButton: true,
          timer: 1500,
        });
        return;
      }
      const obj = {
        Todo: input.value,
        uid: uid,
        postDate: Timestamp.fromDate(new Date()),
      };
      try {
        const docRef = await addDoc(collection(db, "users"), obj);
        console.log("Document written with ID: ", docRef.id);
        Array = [];
        render(uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  } else {
  }
});

async function render(uid) {
  div.innerHTML = "";
  Array = [];

  const querySnapshot = await getDocs(
    query(
      collection(db, "users"),
      orderBy("postDate", "desc"),
      where("uid", "==", uid)
    )
  );

  querySnapshot.forEach((doc) => {
    Array.push({ ...doc.data(), docId: doc.id });
  });
  Array.forEach((obj) => {
    div.innerHTML += `<div class="p-2 flex justify-between">${obj.Todo}<div><button class="delete  p-1  ml-5 "><i class="fa-solid fa-trash"></i></button> <button class="edit  p-1 ml-5 "><i class="fa-solid fa-pen-to-square"></i></button></div></div>`;
  });
  const remove = document.querySelectorAll(".delete");
  const update = document.querySelectorAll(".edit");
  remove.forEach((button, index) => {
    button.addEventListener("click", async () => {
      console.log("Delete button clicked", [index]);
      await deleteDoc(doc(db, "users", Array[index].docId));
      render(uid);
    });
  });
  console.log(Array);
  update.forEach((button, index) => {
    button.addEventListener("click", async () => {
      console.log("Update button clicked", [index]);
      const newTodo = prompt("Enter Updated todo Task");
      console.log(newTodo);
      await updateDoc(doc(db, "users", Array[index].docId), {
        Todo: newTodo,
      });
      render(uid);
    });
  });
}
