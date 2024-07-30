import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import styles from "./index.css";

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
    <>
      <div className="cursor-default fixed left-0 top-0 bottom-0 space-y-2 text-md shadow-lg">
        {userData ? (
          <>
            <div className="flex items-center shadow-lg p-5">
              <span class="material-symbols-rounded text-4xl mr-3">account_circle</span>
              <div className="block">
                <p>{userData.name}</p>
                <p className="text-sm text-zinc-500">{userData.email}</p>
              </div>
              <button onClick={logOut}>
                <span class="ml-3 text-3xl hover:bg-zinc-100 p-1 rounded-md material-symbols-rounded">logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
          <div className="flex fixed left-0 top-0 right-0 bottom-0 justify-center items-center content-center">
            <img src="./loading.gif"></img>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
