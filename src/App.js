// import React from "react";
// import './App.css';
// import Header from './Header';
// import Home   from "./Home";
// import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//         <Route path="/checkout">
//             <Header />
//             <h1>I am a checkout.Smash the like button</h1>
//           </Route>
//           <Route path="/">
//             <Header />
//             <Home />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout"; // Imported Checkout component
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useStripe} from "@stripe/react-stripe-js";

const stripePromise=loadStripe("pk_test_51R2crjCFfRcf7IM3IxNslai3TFhfANYKOSodcpLh4aLQN9m6Ypnw6lUHyt9kXEBSMn7LA4FeItFgcs5Nt9zpMsiD00raP3z4Td");

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>> ', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        {/* ✅ Header is placed here so it's always visible */}
        <Header />  

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={ <Elements stripe={stripePromise}><Payment/></Elements>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;