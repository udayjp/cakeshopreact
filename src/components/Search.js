import { withRouter } from "react-router-dom"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Data from './Data';
import axios from 'axios';

const Search = (props) => {
    var cakeDetails = () => {
        var url = "/cakedetails/" + props.search.cakeid
        props.history.push(url)
    }

    var [cake, setCake] = useState(Data.cake)
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
                //alert(response.data.message)  
                toast.success("Added to cart successfully!");

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
        <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-4">
                <img onClick={cakeDetails} src={props.search.image} alt={props.search.name} width="100%" height="240" />
            </div>
            <div className="col-8">
                <p>
                    <strong>Ratings: <span style={{ color: "orange" }}> {props.search.ratings} <i class="fas fa-star"></i></span></strong>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Likes:  {props.search.likes} </strong>
                    <br />
                    <strong>
                        Name: {props.search.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {!props.search.eggless && <span style={{ color: "red" }}> <i class="fas fa-circle"></i> </span>}
                        {props.search.eggless && <span style={{ color: "green" }}> <i class="fas fa-circle"></i> </span>}

                    </strong>
                    <br />
                    <strong>Weight:  {props.search.weight} kg</strong>
                    <br />
                    <strong> Flavour:</strong>  {props.search.flavour}
                    <br />
                    <strong> Type:</strong>  {props.search.type}
                    <br />
                    <strong> Description:</strong>  {props.search.description}
                    <br />
                    <strong> Price: </strong>Rs. {props.search.price}
                </p>
                <button onClick={addToCart} className="btn btn-sm btn-primary">Add to Cart</button>

            </div>
        </div>
    )
}

export default withRouter(Search)