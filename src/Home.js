import React, { useEffect, useState } from "react";
import { collection, doc, setDoc ,getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import styles from "./index.css";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function logOut() {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("name", "default");
  localStorage.setItem("email", "default");
  window.location.reload();
}

function Home() {
  const [userData, setUserData] = useState(null);
  const documentName = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      if (documentName) {
        const docRef = doc(db, "users", documentName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
            const notesRef = collection(db, "users", documentName, "notes");
            await setDoc(doc(notesRef, "notes"), {
              notes: [],
            });
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
              <div className="rounded-full h-12 w-12 mr-5">
                <img className="rounded-full" src={userData.image}></img>
              </div>
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
