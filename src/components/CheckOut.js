import { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function chkAlphaSpace(str) {
    const regx = /^[a-zA-Z ]*$/;
    return regx.test(str);
}
function chkOnlyNumbers(str) {
    const regx = /^[0-9]+$/;
    return regx.test(str);
}

class CheckOut extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
        }
    }

    placeOrder = (event) => {
        event.preventDefault();
        var custName = document.getElementById('custName').value
        var address = document.getElementById('address').value
        var city = document.getElementById('city').value
        var pincode = document.getElementById('pincode').value
        var phone = document.getElementById('phone').value

        var err = {}
        var validValues = {};
        if (!custName) {
            err.custName = "Kindly enter name";
        }
        else if (!chkAlphaSpace(custName)) {
            err.custName = "Only Alphabets and spaces are allowed ";
        }
        else {
            validValues.custName = custName;
        }
        if (!address) {
            err.address = "Kindly enter address";
        }
        else {
            validValues.address = address;
        }

        if (!city) {
            err.city = "Kindly enter city";
        }
        else if (!chkAlphaSpace(city)) {
            err.city = "Only Alphabets and spaces are allowed ";
        }
        else {
            validValues.city = city;
        }

        if (!pincode) {
            err.pincode = "Kindly enter pincode";
        }
        else if (!chkOnlyNumbers(pincode)) {
            err.pincode = "Only numbers are allowed ";
        }
        else {
            validValues.pincode = pincode;
        }

        if (!phone) {
            err.phone = "Kindly enter phone";
        }
        else if (!chkOnlyNumbers(phone)) {
            err.phone = "Only numbers are allowed ";
        }
        else {
            validValues.phone = phone;
        }

        this.setState({
            errors: err,
        })
        console.log("this.props.location.state", this.props.location.state)
        console.log("this.props.location.state.cakes", this.props.location.state.cakes)
        var data = {
            userid: localStorage.userid,
            cakeid: this.props.location.state.cakes,
            name: custName,
            address: address,
            city: city,
            pincode: pincode,
            phone: phone,
            // orderdate: Date.now()
        }
        console.log("===========", data)
        if (Object.keys(err).length === 0 && err.constructor === Object) {
            axios({
                url: "http://68.183.80.25:8007/api/orders",
                method: "post",
                data: data,
                headers: {
                    Authorization: "Token " + localStorage.token
                }
            }).then((response) => {
                axios({
                    url: "http://68.183.80.25:8007/api/orders",
                    method: "delete",
                    headers: {
                        Authorization: "Token " + localStorage.token
                    }
                }).then((response) => {
                    toast.success(response.data);
                    this.props.history.push('/orders');
                }, (err) => {
                    console.log("Error from API", err)
                })
            }, (err) => {
                console.log("Error from API", err)
            })
        }
        else {
            alert("Form have errors")
            toast.warning("Form have errors");
        }
    }
    render() {
        return (
            <div className="container">
                <h2>User Details</h2>
                <div class="col">
                    <label for="custName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="custName" placeholder="Customer name" />
                    {
                        this.state.errors.custName && <div> <label className="text-danger">
                            {this.state.errors.custName} </label> </div>
                    }
                </div>
                <div class="col">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="Address" />
                </div>
                <div class="col">
                    <label for="city" class="form-label">City</label>
                    <input type="text" class="form-control" id="city" placeholder="City" />
                </div>
                <div class="col">
                    <label for="pincode" class="form-label">Pincode</label>
                    <input type="text" class="form-control" id="pincode" placeholder="Pincode" />
                </div>
                <div class="col">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" placeholder="Phone" />
                </div>
                <div class="col">
                    <button onClick={this.placeOrder}>Place order</button>
                </div>
            </div>
        )
    }
}

export default CheckOut