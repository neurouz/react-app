import "../../styles/products.css";
import "bootstrap/dist/css/bootstrap.css";

import Loader from "../Loader";
import Product from "../products/Product";

import APIService from "../../services/apiService";
import React, { Component } from "react";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    APIService.GetAsync("Product").then((response) => {
      this.setState({
        data: response.data,
        isLoaded: true,
      });
    });
  }

  render() {
    var { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <Loader></Loader>;
    } else {
      return (
        <div>
          <h1 className="text-center font-weight-bold mt-4 mb-5">
            {" "}
            Available products{" "}
          </h1>
          <div className="products-all">
            {data.map((product) => (
              <Product
                id={product.id}
                key={product.id}
                product={product}
              ></Product>
            ))}
          </div>
        </div>
      );
    }
  }
}
