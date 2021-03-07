import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total,prd)=>total+prd.price*prd.quantity,0)
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }
    const tax = (totalPrice / 10);
    const grandTotal = totalPrice + shipping+tax;
    const formateNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
          <h4>Order Summary</h4> 
          <p>Items ordered: {cart.length}</p>
          <p>Product Price:{formateNumber(totalPrice)}</p>
          <p><small>Shipping:${formateNumber(shipping)}</small></p>
          <p><small>Tax + VAT:{formateNumber(tax)}</small></p>
          <p>Total Price: {formateNumber(grandTotal)}</p> 
          <br/>
          {
              props.children
          }
        </div>
    );
};

export default Cart;