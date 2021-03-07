import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const[orderPlaced,setOrderPlaced]=useState(false)
    const handlePlaceOrder =()=>{
        console.log('order placed');
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    const removeProduct = (productKey => {
        const { key } = productKey.product;
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    })
    useEffect(() => {
        //cart 
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);

    }, [])
    let thankyou;
    if(orderPlaced){
     thankyou = <img src={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}>

                    </ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="main-button">place Order</button>
            </Cart>

        </div>
    );
};

export default Review;