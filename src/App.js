import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function googlesignIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

function App() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={googlesignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;