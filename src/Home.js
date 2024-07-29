import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function logOut() {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("name", "default");
  window.location.reload();
}

function Home() {
  const [userData, setUserData] = useState(null);
  const documentName = localStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      if (documentName) {
        const docRef = doc(db, "users", documentName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document");
        }
      }
    };
    fetchData();
  }, [documentName]);

  return (
    <div>
      <h1>Welcome </h1>
      <h3>Account Information:</h3>
      {userData ? (
        <>
          <p>
            <b>Name: </b>
            {userData.name}
          </p>
          <p>
            <b>Email: </b>
            {userData.email}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Home;
