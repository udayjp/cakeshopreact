import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}


class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            errorMsessage: {}
        }
    }
    showErrorMessage = (event) => {
        event.preventDefault();
        const newpassword = document.getElementById('newpassword').value
        const token = document.getElementById('token').value
        var errors = {};
        var userData = {};
        if (!newpassword) {
            errors.errNewpassword = "Kindly enter new password";
        }
        else if (!checkPassword(newpassword)) {
            errors.errUserEmail = "Enter valid password must contains upper,lower, special and atleast 8 character";
        }
        else {
            userData.password = newpassword;
        }
        if (!token) {
            errors.errToken = "Kindly enter token recieved in email";
        }
        else {
            userData.token = token;
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
                url:"http://68.183.80.25:8007/api/password_reset/confirm/",
                method: "post",
                data: userData
            }).then((response) => {
                alert("Password reset successfully!")
                toast.success(response.data);
                window.location.replace("../login");
            }, (err) => {
                console.log("Error from API", err)
                errors.errNewpassword=err.password
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
                            <label for="newpassword">New Password</label><br />
                            <input type="text" name="newpassword" class="form-control" id="newpassword"
                                placeholder="Enter new password" />
                            {
                                this.state.errorMsessage.errNewpassword && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errNewpassword} </label> </div>
                            }
                        </div>
                        <div class="form-group">
                            <label for="token">Token</label><br />
                            <input type="text" name="token" class="form-control" id="token"
                                placeholder="Enter token" />
                            {
                                this.state.errorMsessage.errToken && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errToken} </label> </div>
                            }
                        </div>

                        <div class="form-group">
                            <br />
                            <Link to="/login" onClick={this.showErrorMessage} className="btn btn-primary btn-md">Reset Password</Link>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default ResetPassword;