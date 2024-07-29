import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, reload, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig";
import { useState } from "react";
import Home from "./Home";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function googlesignIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in as " + user.displayName);
      localStorage.setItem("Name", user.displayName);
      localStorage.setItem("Email", user.email);
      localStorage.setItem("UID", user.uid);
      localStorage.setItem("isLoggedIn", true);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

function App() {
  if (localStorage.getItem("isLoggedIn")){
    return(
      <Home/>
    )
  }
    return (
  <div>
    <h1>Sign In</h1>
    <button onClick={googlesignIn}>Sign in with Google</button>
  </div>
)
  
}

export default App;
