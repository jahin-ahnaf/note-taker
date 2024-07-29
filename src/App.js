import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import Home from "./Home";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
function googlesignIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      let name = user.displayName;
      let email = user.email;
      let image = user.photoURL;
      localStorage.setItem("name", name);
      console.log("Logged in as " + name);
      await setDoc(doc(db, "users", name), {
        name: name,
        email: email,
        image: image,
      });
      localStorage.setItem("isLoggedIn", true);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

function App() {
  if (localStorage.getItem("isLoggedIn")) {
    return <Home />;
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={googlesignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;
