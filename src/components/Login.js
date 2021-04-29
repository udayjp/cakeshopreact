import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

class Login extends Component {
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
        var errors = {};
        var userData = {};
        if (!userName) {
            errors.errUserName = "Kindly enter user name";
        }
        else {
            userData.username = userName;
        }
        if (!userPassword) {
            errors.errUserPassword = "Kindly enter password";
        }
        else {
            userData.password = userPassword;
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
                // url: "https://apibyashu.herokuapp.com/api/login",
                url: "http://68.183.80.25:8007/api/login",
                method: "post",
                data: userData
            }).then((response) => {
                console.log("Response from API", response)
                if (response.data.token) {
                    localStorage.token = response.data.token
                    axios({
                        url: "http://68.183.80.25:8007/api/user",
                        method: "get",
                        headers: {
                            Authorization: "Token "+ response.data.token
                        }
                    }).then((response) => {
                        localStorage.email = response.data.email
                        localStorage.username = response.data.username
                        localStorage.userid=response.data.id             
                    }, (err) => {
                        console.log("Error from API ", err)
                    })                    
                    this.props.history.push('/');
                    this.props.dispatch({
                        type: "LOGIN"
                    })
                    toast.success("Login successful")
                }
                else {
                    toast.warning(response.data.message)
                }



            }, (err) => {
                console.log("Error from API", err)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">
                    <h2 className="text-center" style={{margin:"20px 0"}}> Login</h2>
                        <form className="form-control">
                            <div className="form-group">
                                <label for="userName"><i class="fas fa-user"></i> Username:</label><br />
                                <input type="text" name="userName" className="form-control" id="userName"
                                    placeholder="User name" />
                                {
                                    this.state.errorMsessage.errUserName && <div> <label className="text-danger">
                                        {this.state.errorMsessage.errUserName} </label> </div>
                                }
                            </div>
                            <div className="form-group">
                                <br />
                                <label for="userPassword"><i class="fas fa-key"></i> Password:</label><br />
                                <input type="password" name="userPassword" className="form-control" id="userPassword"
                                    placeholder="Password" />
                                {
                                    this.state.errorMsessage.errUserPassword && <div> <label className="text-danger">
                                        {this.state.errorMsessage.errUserPassword} </label> </div>
                                }
                            </div>
                            <div className="form-group text-center">
                                <br />
                                <input className="btn btn-primary" type="submit" onClick={this.showErrorMessage}
                                    className="btn btn-primary" value="Login" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to="/forgotpassword">Forgot password?</Link>

                            </div>
                            <div id="register-link" className="text-center">
                                <br />
                                New user click here for &nbsp;&nbsp;
                                <Link to="/signup">
                                    Sign up
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        );
    }
}

var login = withRouter(Login)
export default connect()(login);