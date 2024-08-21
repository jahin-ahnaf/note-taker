import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import Home from "./Home";
import './output.css';

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
      localStorage.setItem("email", email);
      console.log("Logged in as " + name);
      await setDoc(doc(db, "users", email), {
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
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0">
      <div className="block text-center shadow-md p-10">
        <h1 className="font-bold text-xl">Sign In</h1>
        <p className="mt-3">Sign in to your account</p>
        <button onClick={googlesignIn} className="p-2 pl-5 pr-5 bg-blue-500 text-white rounded-full mt-8 hover:bg-blue-600 focus:border-solid focus:border-blue-200 focus:border-4">Sign in with Google</button>
      </div>
    </div>
  );
}

export default App;
