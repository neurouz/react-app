import "../styles/navbar.css";
import "bootstrap/dist/css/bootstrap.css";

import APIService from "../services/apiService";
import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.service = new APIService();
    this.state = {
      loaded: false,
      data: [],
    };
  }
  render() {
    this.service.GetAsync("Account").then((response) => {
      this.setState({
        loaded: true,
        data: response.data,
      });
    });

    var { loaded, data } = this.state;
    if (!loaded) {
      return <p> Loading... </p>;
    } else {
      return (
        <div className="accounts-parent">
          {data.map((item) => (
            <div className="account" key={item.id}>
              <p className="account-username">Username: {item.username}</p>
              <p className="account-mail">E-mail: {item.email}</p>
              <p className="account-created">
                Account created: {item.dateCreated}
              </p>
            </div>
          ))}
        </div>
      );
    }
  }
}
