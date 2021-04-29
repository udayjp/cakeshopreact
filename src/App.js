import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CakeDetails from './components/CakeDetails'
import PageNotFound from './components/PageNotFound';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/Login'
import RecoverPassword from './components/RecoverPassword';
import SignUp from './components/SignUp';
import SearchList from './components/SearchList'
import AddCake from './components/AddCake'
import Cart from './components/Cart'
import CheckOut from './components/CheckOut'
import Orders from './components/Orders'
import ResetPassword from './components/ResetPassword'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    if (localStorage.token) {
      return (
        <div className="App">
          <ToastContainer />
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cakedetails/:cakeid" component={CakeDetails} />
              <Route exact path="/search" component={SearchList} />
              <Route exact path="/addcake" component={AddCake} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={CheckOut} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/*" component={PageNotFound} />
            </Switch>
          </Router>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <ToastContainer />
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cakedetails/:cakeid" component={CakeDetails} />
              <Route exact path="/search" component={SearchList} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={RecoverPassword} />
              <Route exact path="/resetpassword" component={ResetPassword} />
              <Route exact path="/*" component={PageNotFound} />
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

export default App;
