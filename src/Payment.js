// import React,{useState} from 'react';
// import "./Payment.css";
// import { useStateValue } from './StateProvider';
// import CheckoutProduct from './CheckoutProduct';
// import { Link } from 'react-router-dom';
// import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
// import CurrencyFormat from "react-currency-format";
// import { getBasketTotal } from './reducer';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// export default function Payment() {
//     const[{basket,user},dispatch] = useStateValue();
//     const navigate = useNavigate();

//     const stripe=useStripe();
//     const elements=useElements();

//     const [succeeded,setSucceeded] = useState(false);
//     const [processing,setProcessing] = useState("");
//     const[error,setError]= useState(null);
//     const [disabled,setDisabled]=useState(true);
//     const [clientSecret,setClientSecret]=useState(true);

//     useEffect(() => {
//         //Generate the special Stripe secret which allows us to charge a customer
//         // const getClientSecret = async () => {
//         //     const response = await axios({
//         //         method: "post",
//         //         url: `/payments/create"total=${getBasketTotal(basket) * 100}`,
//         //     });
//         //     setClientSecret(response.data.clientSecret);
//         // };
//         // const getClientSecret = async () => {
//         //     try {
//         //         const total = getBasketTotal(basket) * 100; // Convert to smallest currency unit (cents)
                
//         //         const response = await axios.post(
//         //             `http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/api/payments/create?total=${total}`
//         //         );
        
//         //         setClientSecret(response.data.clientSecret);
//         //     } catch (error) {
//         //         console.error("Error fetching client secret:", error);
//         //     }
//         // };
//         const getClientSecret = async () => {
//             try {
//                 const total = getBasketTotal(basket) * 100; // Convert to smallest currency unit (cents)
        
//                 const response = await axios.post(
//                     "http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/api/payments/create",
//                     { total } // Send `total` in body, not query
//                 );
        
//                 console.log("Client Secret from API:", response.data.clientSecret); // ✅ Log the secret key
//                 setClientSecret(response.data.clientSecret);
//             } catch (error) {
//                 console.error("Error fetching client secret:", error);
//             }
//         };
        
        
//         getClientSecret();
//     }, [basket]);

//     console.log('th secret is >>>',clientSecret)
//     const handleSubmit = async (event)=>{
//         //do all the fancy stripe
//         event.preventDefault();
//         setProcessing(true);

//         const payload = await stripe.confirmCardPayment(clientSecret,{
//             payment_method:{
//                 card:elements.getElement(CardElement)
//             }
//         }).then(({paymentIntent})=>{
//             //paymentIntent=payment Confirmation

//             setSucceeded(true);
//             setError(null)
//             setProcessing(false)

//             navigate('/orders');
//         })
//     }

//     const handleChange = event=>{
//         setDisabled(event.empty);
//         setError(event.error ? event.error.message : "");
//     }

//     return (

//         <div className='payment'>
//             <div className='payment__container'>
//             <h1>
//                 Checkout(<Link to="/checkout">{basket?.length}items</Link>)
//             </h1>

//                 {/* payment section - delivery address */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Delivery Address</h3>
//                     </div>
//                     <div className='payment__address'>
//                         <p>{user?.email}</p>
//                         <p>123 React Lane</p>
//                         <p>Los Angeles,CA</p>
//                     </div>
//                 </div>

//                 {/* payment section - review items */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Review Items and Delivery</h3>
//                     </div>
//                     <div className='payment__items'>
//                         {basket.map(item => (
//                             <CheckoutProduct
//                                 id={item.id}
//                                 title={item.title}
//                                 image={item.image}
//                                 price={item.price}
//                                 rating={item.rating}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* payment section - payment method */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Payment Method</h3>
//                     </div>
//                     <div className='payment__details'>
//                         <form>
//                             <CardElement onChange={handleChange}/>

//                             <div className='payment__priceContainer'>
//                                 <CurrencyFormat
//                                 renderText={(value)=>(
//                                     <h3>Order Total :{value}</h3>
//                                 )}
//                                 decimalScale={2}
//                                 value={getBasketTotal(basket)}
//                                 displayType={"text"}
//                                 thousandSeparator={true}
//                                 prefix={"$"}
//                                 />
//                                 <button disabled={processing || disabled || succeeded}>
//                                     <span>{processing ? <p>Processing</p> :
//                                     "Buy Now"}</span>
//                                 </button>
//                             </div>

//                             {/*Errors*/}
//                             {error &&  <div>{error}</div>}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import { db } from "./firebase";


export default function Payment() {
    const [{ basket, user },dispatch] = useStateValue();
    const navigate = useNavigate();
    
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(""); // ✅ Fix: Initialize with empty string

    useEffect(() => {
        if (basket.length === 0) return;
    
        const getClientSecret = async () => {
            const total = getBasketTotal(basket) * 100; // Convert to cents
            console.log("🔵 Sending Total (cents):", total);
    
            try {
                const response = await axios.post(
                    "http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/api/payments/create",
                    { total },
                    { headers: { "Content-Type": "application/json" } }
                );
    
                console.log("✅ API Response:", response.data);
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("❌ Axios Error:", error.response?.data || error.message);
            }
        };
    
        getClientSecret();
    }, [basket]);
    
    console.log("Current Client Secret:", clientSecret); // ✅ Always log to debug
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
    
        if (!clientSecret) {
            console.error("❌ Error: No Client Secret received.");
            return;
        }
    
        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });
    
            console.log("🔵 Payment Payload:", payload);
            const paymentIntent = payload.paymentIntent;
    
            if (!paymentIntent) {
                console.error("❌ Payment Intent Failed");
                setProcessing(false);
                return;
            }
    
            console.log("✅ Payment Successful:", paymentIntent);
    
            await db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });
    
            dispatch({ type: "EMPTY_BASKET" });
    
            setSucceeded(true);
            setError(null);
            setProcessing(false);


    
            console.log("✅ Navigating to orders page...");
            navigate("/orders");
        } catch (err) {
            console.error("❌ Error Processing Payment:", err.message);
            setError(err.message);
            setProcessing(false);
        }
    };
    
    

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                {/* Payment section - Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? "Processing" : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div className="payment__error">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
