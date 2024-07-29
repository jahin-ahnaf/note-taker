import React from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";

localStorage.setItem("name", "default")
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let documentName = localStorage.getItem("name");
  const docRef = doc(db, "users", documentName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
  } else {
    console.log("No such document");
  }

function logOut() {
  localStorage.removeItem("isLoggedIn")
  localStorage.setItem("name", "default")
  window.location.reload();
}

function Home() {
  return (
    <div>
      <h1>Welcome </h1>
      <h3>Account Information:</h3>
      <p>
        <b>Name:  </b>{docSnap.data().name}
      </p>
      <p>
        <b>Email: </b>{docSnap.data().email}
      </p>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Home;
