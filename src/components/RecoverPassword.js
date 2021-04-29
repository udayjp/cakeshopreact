import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


class RecoverPassword extends Component {
    constructor() {
        super();
        this.state = {
            errorMsessage: {}
        }
    }
    showErrorMessage = (event) => {
        event.preventDefault();
        const userEmail = document.getElementById('userEmail').value
        var errors = {};
        var userData = {};
        if (!userEmail) {
            errors.errUserEmail = "Kindly your email id";
        }
        else if (!validateEmail(userEmail)) {
            errors.errUserEmail = "Enter valid email";
        }
        else {
            userData.email = userEmail;
        }

        this.setState({
            errorMsessage: errors
        })

        console.log("============User details==========", userData)

        if (Object.keys(userData).length === 0) {
            console.log("Invalid data")
        }
        else {

            axios({
                // url: "https://apibyashu.herokuapp.com/api/recoverpassword",
                url:"http://68.183.80.25:8007/api/password_reset/",
                method: "post",
                data: userData
            }).then((response) => {
                alert("Password reset information email to you successfully!")
                toast.success(response.data);
                window.location.replace("../resetpassword");
            }, (err) => {
                console.log("Error from API", err)
            })
        }
    }

    render() {
        return (

            <div class="row justify-content-center align-items-center" style={{ marginTop: "10px" }}>
                <div class="col-md-4">
                    <h2 className="text-center" style={{ margin: "20px 0" }}>Recover Password</h2>
                    <form className="form-control">                   
                        <div class="form-group">
                            <label for="userEmail">Email Id:</label><br />
                            <input type="text" name="userEmail" class="form-control" id="userEmail"
                                placeholder="User email" />
                            {
                                this.state.errorMsessage.errUserEmail && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errUserEmail} </label> </div>
                            }
                        </div>

                        <div class="form-group">
                            <br />
                            <Link to="/login" onClick={this.showErrorMessage} className="btn btn-primary btn-md">Recover Password</Link>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default RecoverPassword;