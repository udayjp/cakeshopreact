import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function validateUserName(user) {
    const nameRegex = /^[a-zA-Z\-]+$/;
    return nameRegex.test(user);
}

function checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            errorMsessage: {}
        }
    }
    showErrorMessage = (event) => {
        event.preventDefault();
        const userName = document.getElementById('userName').value
        const userPassword = document.getElementById('userPassword').value
        const userEmail = document.getElementById('userEmail').value
        var errors = {};
        var userData = {};
        //USER NAME
        if (!userName) {
            errors.errUserName = "Kindly enter user name";
        }
        else if (!validateUserName(userName)) {
            errors.errUserName = "Only alphabets are required in user name";
        }
        else {
            userData.username = userName;
        }

        //PASSWORD
        if (!userPassword) {
            errors.errUserPassword = "Kindly enter password";
        }
        // else if (!checkPassword(userPassword)) {
        //     errors.errUserPassword = "Password must contains atleast 8 character, upper and lower case letters and a special character ";
        // }
        else {
            userData.password = userPassword;
        }

        //EMAIL
        if (!userEmail) {
            errors.errUserEmail = "Kindly enter email id";
        }
        else if (!validateEmail(userEmail)) {
            errors.errUserEmail = "Kindly enter valid email id";
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
                // url: "https://apibyashu.herokuapp.com/api/register",
                url:"http://68.183.80.25:8007/api/register",
                method: "post",
                data: userData
            }).then((response) => {
                toast.success(response.data)
                alert(response.data)
                window.location.replace("../login");
            }, (err) => {
                console.log("Error from API", err.statusText)
            })
        }
    }

    render() {
        return (
            <div class="row justify-content-center align-items-center">
                <div class="col-md-4">
                    <h2 className="text-center" style={{ margin: "20px 0" }}>Sign Up</h2>
                    <form className="form-control">

                        <div class="col">
                            <label for="userName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="userName" placeholder="User name" />
                            {
                                this.state.errorMsessage.errUserName && <div> <label className="text-danger"> {this.state.errorMsessage.errUserName} </label> </div>
                            }
                        </div>
                        <div class="col">
                            <label for="userEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="userEmail" placeholder="Email" />
                            {
                                this.state.errorMsessage.errUserEmail && <div> <label className="text-danger"> {this.state.errorMsessage.errUserEmail} </label> </div>
                            }
                        </div>
                        <div class="col">
                            <label for="userPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="userPassword" placeholder="Password" />
                            {
                                this.state.errorMsessage.errUserPassword && <div> <label className="text-danger"> {this.state.errorMsessage.errUserPassword} </label> </div>
                            }
                        </div>

                        <div class="col">
                            <br />
                            <button type="submit" onClick={this.showErrorMessage} className="btn btn-primary mb-3">Sign Up</button>
                            <br /> All ready registered user, kindly click here for &nbsp;&nbsp;
                                <Link to="/login">Login</Link>

                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default SignUp;