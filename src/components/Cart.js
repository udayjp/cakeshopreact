import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Data from "./Data";
import CartItem from "./CartItem";

const Cart = (props) => {
    const { cakeid } = useParams();
    var [cartItems, setCartItems] = useState([])
    var removeFromCart = (index) => {
        cartItems.splice(index, 1)
        var tmp = [...cartItems]
        setCartItems(tmp)
    }

    useEffect(function () {
        axios({
            url: "http://68.183.80.25:8007/api/cartitems",
            method: "get",
            headers: {
                Authorization: "Token " + localStorage.token
            }
        }).then((response) => {
            console.log("====Response data ====", response.data)
            Data.cartItems = response.data
            setCartItems(response.data)
        }, (err) => {
            console.log("Error from API ", err)
        })
    }, []);
    var totalPrice = 0
    var cakes = []
    cartItems.map((each, index) => {
        cakes[index] = each.cakeid.id
        return totalPrice = totalPrice + each.cakeid.price
    })

    var CheckOut = () => {
        var url = "/checkout?"
        var cartData = {
            cakes: cakes,
            price: totalPrice
        }
        props.history.push(url, cartData)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {cartItems.length > 0 && <h1 style={{ margin: "20px 0" }}><i class="fas fa-shopping-cart"></i> Cart Items</h1>}
                    {!cartItems.length > 0 && <h1 className="alert alert-warning">Your Cart Is Empty</h1>}
                </div>
            </div>
            {cartItems.length > 0 && <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col">
                            <strong>Name</strong>
                        </div>
                        <div className="col">
                            <strong>Price</strong>
                        </div>
                        <div className="col">

                        </div>
                    </div>

                    {
                        cartItems.length > 0 && cartItems.map((each, index) => {
                            return <CartItem removefromcart={removeFromCart} cartid={each.id} key={index} cart={each.cakeid} />
                        })
                    }
                </div>
                <div className="col-4" style={{ border: "1px solid #555555", borderRadius: "5px" }}>
                    {cartItems.length > 0 && <div className="row">
                        <div className="col">
                            <strong>No. of Items  <br />
                                {cartItems.length}
                            </strong>
                            <br />
                            <br />
                            <button onClick={CheckOut} className="btn btn-primary">Checkout</button>
                        </div>
                        <div className="col">
                            <strong>Total Price <br />
                              Rs.  {totalPrice}
                            </strong>
                        </div>
                    </div>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default Cart;