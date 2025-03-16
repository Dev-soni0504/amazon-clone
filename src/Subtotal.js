import React from 'react';
import "./Subtotal.css";
import { NumericFormat } from "react-number-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from "./reducer";
import {useNavigate} from "react-router-dom";

export default function Subtotal() {
  const navigate =  useNavigate();
  const [{basket}] = useStateValue();
  return (
    <div className='subtotal'>
      <NumericFormat
        
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length},items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        value={getBasketTotal(basket)} 
        displayType={"text"}
        decimalScale={2}
        thousandSeparator={true} 
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to Checkout </button>
    </div>
  );
}
