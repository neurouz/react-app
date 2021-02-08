// Import styles
import "./App.css";

// Import custom components
import Navbar from "./components/navbar";
import Products from "./components/products/Products";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Cart from "./components/cart/cart";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: localStorage.getItem("etoolservice_api_key"),
      authenticated: localStorage.getItem("etoolservice_api_key")
        ? true
        : false,
    };
  }

  Authenticate = (authenticated, apiKey) => {
    this.setState({
      authenticated: authenticated,
      apiKey: apiKey,
    });
  };

  render() {
    // var message = "";
    // if (this.state.authenticated === true || this.state.apiKey) {
    //   message = "Hello, " + LocalStorageService.GetJsonData().username;
    // }
    return (
      <Router>
        <div>
          <Navbar
            Authenticate={this.Authenticate}
            auth={this.state.authenticated}
          />
          <Switch>
            <Route path="/products" component={Products}></Route>
            <Route path="/register" component={Register}></Route>
            <Route
              path="/login"
              render={() => <Login Authenticate={this.Authenticate} />}
            ></Route>
            <Route
              path="/cart"
              render={() => <Cart auth={this.state.authenticated}></Cart>}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
