// import React,{useState} from 'react';
// import "./Login.css";
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';

// import { auth } from './firebase';


// export default function Login() {
//   const [email,setEmail] = useState('');
//   const [password,setPassword] = useState('');

//   const signIn = e => {
//     e.preventDefault();

//     auth
//       .createUserWithEmailAndPassword(email,password)
//       .then((auth) => {
//         //it successfully created a new user with email and password
//         console.log(auth);
//       })
//       .catch(error => alert(error.message))
//     //some fancy firebase login shitt...
//   }

//   const register = e=>{
//     e.preventDefault();

//     //some firebase register shit....
//   }

//   return (
//     <div className='login'>
//         <Link to = "/">
//         <img 
//             className='login__logo'
//             src='https://static.vecteezy.com/system/resources/previews/019/766/240/non_2x/amazon-logo-amazon-icon-transparent-free-png.png'
//         />
//         </Link>

//         <div className='login__container'>
//             <h1>Sign-in</h1>

//             <form>
//                 <h5>E-mail</h5>
//                 <input type="text" value={email}
//                        onChange={e=>setEmail(e.target.value)}/>

//                 <h5>Password</h5>
//                 <input type="password" value={password}
//                        onChange={e=>setEmail(e.target.value)}/>

//                 <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
//             </form>

//             <p>
//                 By Signing-in you agree to Amazon's Fake 
//                 Conditions of Use & Sale.Please
//                 see our Privacy Notice,or Cookies Notice
//                 and our Interest based ads Notice.
//             </p>

//             <button 
//               onClick={register}
//               className='login__registerButton'>Create your Amazon Account</button>
//         </div>
//     </div>
//   )
// }

import React, { useState } from 'react';
import "./Login.css";
import { Link,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { auth } from './firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/")
      })
      .catch(error => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if(auth){
          navigate('/')
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className='login'>
      <Link to="/">
        <img 
          className='login__logo'
          src='https://static.vecteezy.com/system/resources/previews/019/766/240/non_2x/amazon-logo-amazon-icon-transparent-free-png.png'
        />
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />

          <h5>Password</h5>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // ✅ Fixed here
          />

          <button 
            type='submit' 
            onClick={signIn} 
            className='login__signInButton'>
            Sign In
          </button>
        </form>

        <p>
          By signing in, you agree to Amazon's Fake Conditions of Use & Sale. 
          Please see our Privacy Notice, Cookies Notice, and Interest-Based Ads Notice.
        </p>

        <button 
          onClick={register}
          className='login__registerButton'>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

