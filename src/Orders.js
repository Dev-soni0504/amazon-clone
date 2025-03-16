import React, { useState } from 'react';
import "./Orders.css";
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import Order from './Order';

export default function () {
    const[{basket,user},dispatch] = useStateValue();
    const[orders,setOrders]=useState([]);

    useEffect(() => {
      if(user){
        db
        .collection('user')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot(snapshot => {
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })));
        });
      }else{
        setOrders([])
      }
    },[user])

  return (
    <div className='orders'>
        <h1>Your Orders</h1>

        <div className='orders__order'>
          {orders?.map(order=>(
            <Order order ={order}/>
          ))}
        </div>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import "./Orders.css";
// import { db } from './firebase';
// import { useStateValue } from './StateProvider';

// export default function Orders() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         if (user) {
//             const unsubscribe = db
//                 .collection('users') // Collection name should match your Firestore structure
//                 .doc(user?.uid)
//                 .collection('orders')
//                 .orderBy('created', 'desc')
//                 .onSnapshot(snapshot => {
//                     setOrders(snapshot.docs.map(doc => ({
//                         id: doc.id,
//                         data: doc.data()
//                     })));
//                 });

//             return () => unsubscribe(); // Cleanup function to prevent memory leaks
//         }
//     }, [user]); // Re-run when user changes

//     return (
//         <div className='orders'>
//             <h1>Your Orders</h1>
//             {orders.map(order => (
//                 <div key={order.id} className="order">
//                     <p>Order ID: {order.id}</p>
//                     {/* Render more order details here */}
//                 </div>
//             ))}
//         </div>
//     );
// }
