import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Data from "./Data";

const Orders = () => {
    var [orders, setOrders] = useState([])
    
    useEffect(function () {
        console.log("Inside useEffect")
        axios({
            url: "http://68.183.80.25:8007/api/orders",
            method: "get",
            headers: {
                Authorization: "Token " + localStorage.token
            }
        }).then((response) => {
            console.log("====Response from API ====", response.data)
            Data.orders = response.data
            setOrders(response.data)
        }, (err) => {
            console.log("Error from API ", err)
        })
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {orders.length > 0 && <h1 style={{ margin: "20px 0" }}><i class="fas fa-shopping-bag"></i> My Orders </h1>}
                    {!orders.length > 0 && <h1 className="alert alert-warning">No orders</h1>}
                </div>
            </div>
            { orders.length > 0 && <div class="accordion" id="orderAccordion">
                {
                    orders.map((i, index) => {
                        var price=0
                        return (<div class="accordion-item">
                            {
                                <div>
                                    <h2 class="accordion-header" id={"heading" + (index + 1)}>
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + (index + 1)} aria-expanded="false" aria-controls={"collapse" + (index + 1)}>
                                            <strong > Order Id: {i.id}  &nbsp;&nbsp;Order date: {i.orderdate}<br/>
                                                
                                                { 
                                                    i.cakeid.length > 0 && i.cakeid.map((each) => {
                                                        price+=each.price
                                                     })
                                                }
                                                Total: Rs. {price}
                                             
                                               </strong>
                                        </button>
                                    </h2>
                                    <div id={"collapse" + (index + 1)} class="accordion-collapse collapse" aria-labelledby={"heading" + (index + 1)} data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div className="row">
                                                <div className="col">
                                                </div>
                                                <div className="col">
                                                    <strong>  Name</strong>
                                                </div>
                                                <div className="col">
                                                    <strong> Price</strong>
                                                </div>
                                            </div>
                                            {
                                                i.cakeid.length > 0 && i.cakeid.map((each) => {
                                                    return (
                                                        <div className="row" style={{ margin: "5px 0" }}>
                                                            <div className="col">
                                                                <img src={each.image} onError={(e) => e.target.src = "./images/noimage.jpg"} className="left" height="100" width="100" alt={each.name} />
                                                            </div>
                                                            <div className="col">
                                                                {each.name}
                                                            </div>
                                                            <div className="col">
                                                                {each.price}
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                        )

                    })
                }
            </div>
            }
        </div>
    )
}

export default Orders