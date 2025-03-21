// import React from 'react';
// import './Header.css';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import { Link } from 'react-router-dom';
// import { useStateValue } from './StateProvider';
// import {auth} from "./firebase";

// function Header() {
  
//   const[{basket,user},dispatch]=useStateValue();

//   const handleAuthentication = () => {
//     if (user){
//       auth.signOut();
//     }
//   }

//   return (
//     <div className='header'>

//       <Link to="/">
//         <img 
//           className="header__logo"
//           src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png" alt=''
//         />
//       </Link>
        
//         <div 
//         className="header__search">
//             <input
//             className="header__searchInput" type='text'/>    
//             <SearchIcon className='header__searchIcon'/>
//         </div>
//         <div className='header__nav'>
//           <Link to="/login">
//             <div onClick={handleAuthentication} className='header__option'>
//               <span className='header__optionLineOne'> {user ? "Sign Out" : "Sign In"}Hello Guest</span>
//               <span className='header__optionLineTwo'>Sign In</span>
//             </div>
//           </Link>
//           <div className='header__option'>
//             <span className='header__optionLineOne'>Returns</span>
//             <span className='header__optionLineTwo'>& Orders</span>
//           </div>
//           <div className='header__option'>
//             <span className='header__optionLineOne'>Your</span>
//             <span className='header__optionLineTwo'>Prime</span>
//           </div>

//           <Link to ="/checkout">
//             <div className="header__optionBasket">
//               <ShoppingBasketIcon />
//               <span className='header__optionLineTwo header__basketCount'>
//                 {basket?.length}  
//               </span>          
//             </div>
//           </Link>
          

//         </div>
//     </div>
//   )
// }

// export default Header
import React, { useEffect } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  // 🔹 Track authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe(); // Cleanup on unmount
    };
  }, [dispatch]);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className='header'>
      <Link to="/">
        <img 
          className="header__logo"
          src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png" 
          alt=''
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type='text' />
        <SearchIcon className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className='header__option'>
            {/* user?.meail || ""*/}
            <span className='header__optionLineOne'>Hello, {!user ? "Guest":user.email}</span>
            <span className='header__optionLineTwo'>{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>

        <Link to='/orders'>
        <div className='header__option'>
          <span className='header__optionLineOne'>Returns</span>
          <span className='header__optionLineTwo'>& Orders</span>
        </div>
        </Link>
        
        <div className='header__option'>
          <span className='header__optionLineOne'>Your</span>
          <span className='header__optionLineTwo'>Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

