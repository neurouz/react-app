// Import styles
import "./App.css";

// Import custom components
import Navbar from "./components/navbar";
import Products from "./components/products/Products";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/account/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/products" component={Products}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
