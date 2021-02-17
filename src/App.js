// Import styles
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import custom components
import Navbar from "./components/navbar";
import Products from "./components/products/Products";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Cart from "./components/cart/cart";
import Index from "./components/index";
import MyServices from "./components/myServices/myServices";

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
    return (
      <Router>
        <div>
          <Navbar
            Authenticate={this.Authenticate}
            auth={this.state.authenticated}
          />
          <Switch>
            <Route
              path="/index"
              render={() => <Index auth={this.state.authenticated}></Index>}
            ></Route>
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
            <Route
              path="/myservices"
              render={() => (
                <MyServices auth={this.state.authenticated}></MyServices>
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
