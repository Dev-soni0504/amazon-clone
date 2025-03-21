import React from 'react';
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from 'react-currency-format';

export default function Order({order}) {
  return (
    <div className='order'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM DD YYYY,h:mma")}</p>
        <p className='order__id'>
            <small>{order.id}</small>
        </p>
        {
            order.data.basket?.map(item =>(
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.orice}
                    rating={item.rating}
                    hideButton
                />
            ))
        }

        <CurrencyFormat
            renderText={(value)=>(
                <h3 className='order_total'>Order Total:{value}</h3>
            )}
            value={order.data.amount/100} 
            displayType={"text"}
            decimalScale={2}
            thousandSeparator={true} 
            prefix={"$"}
        />
    </div>
  )
}
