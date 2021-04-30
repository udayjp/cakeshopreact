import { useParams } from 'react-router-dom'
import React, { useState } from 'react';
import Data from './Data';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CakeDetails = (props) => {
    const { cakeid } = useParams();
    var [cake, setCake] = useState(Data.cake)
    console.log("cake===",cake)
    if (cake.id != cakeid) {
        axios({
            url: "http://68.183.80.25:8007/api/cakes/" + cakeid,
            method: "get",
        }).then((response) => {
            console.log("====Response from API ", response.data)
            Data.cake = response.data;
            setCake(response.data)
            console.log("inside if cake===",cake)
        }, (err) => {
            console.log("Error from API ", err)
        })
    }

    const addToCart = () => {
        if (localStorage.token) {
            var cakeObj = {
                userid:localStorage.userid,
                cakeid:cake.id,
                name: cake.name,
                image: cake.image,
                price: cake.price,
                weight: cake.weight,
                email: localStorage.email
            }
            console.log("Cart values", cakeObj)
            axios({
                // url: "https://apibyashu.herokuapp.com/api/addcaketocart",
                url:"http://68.183.80.25:8007/api/addtocart",
                method: "post",
                data: cakeObj,
                headers: {
                    // authtoken: localStorage.token
                    Authorization: "Token "+localStorage.token
                }
            }).then((response) => {
                console.log("APi result", response)
                alert("Added to cart successfully!")  
                // toast.success("Added to cart successfully!");
                window.location.replace("../");

            }, (err) => {
                console.log("Error from API", err)
            })
        }
        else {
            alert("Login first")
            props.history.push("/login")
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={cake.image} alt={cake.name} width="100%" />
                </div>
                <div className="col">
                    <h1 className="text-uppercase">{cake.name}
                        <h4 style={{ display: "inline-block", marginLeft: "50px" }}>
                            {!cake.eggless && <span style={{ color: "red" }}> <i class="fas fa-circle"></i> </span>}
                            {cake.eggless && <span style={{ color: "green" }}> <i class="fas fa-circle"></i> </span>}
                        </h4>

                    </h1>
                    <div>
                        {cake.ratings} <i class="fas fa-star"></i> <br />
                        {cake.reviews} reviews,  {cake.likes} likes
                </div>
                Flavour: {cake.flavour} <br />
                Weight: {cake.weight} kg
                <p>
                        Description: <br />
                        {cake.description}
                    </p>
                    <h2 >
                        <span className="text-uppercase">PRICE:</span>
                        <span> Rs. {cake.price}</span>
                    </h2>
                    {/* <button className="btn btn-primary">Buy now</button>&nbsp;&nbsp; */}
                    <button onClick={addToCart} className="btn btn-warning">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default CakeDetails;