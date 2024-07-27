import React, { useEffect, useState } from 'react';
import './output.css'; // Adjust path if necessary
import {auth, provider} from './config' ;
import { signInWithPopup } from 'firebase/auth';
import Home from './Home';

function SignIn(){

  const [value,setValue] = useState('')
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })

return (
  <div>
  {value?<Home/>:
    <button onClick={handleClick} className='px-2 bg-blue-600 text-white hover:bg-blue-900 pt-2 pb-2 pl-3 pr-3 rounded-md'>Sign in with Google</button>
  }
  </div>
);
}
export default SignIn;
