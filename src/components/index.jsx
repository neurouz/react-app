import React, { Component } from "react";
import Product from "./products/Product";
import APIService from "../services/apiService";
import LocalStorageService from "../services/LocalStorageService";

import Slider from "react-slick";

import "../styles/indexPage.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      products: [],
      productsLoaded: false,
      productsExisting: false,
      _isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    if (this.state.auth) {
      const clientId = LocalStorageService.GetJsonData().customerId;
      APIService.GetWithAuthAsync(
        `Product/Recommend/${clientId}`,
        LocalStorageService.GetApiKey()
      )
        .then((res) => {
          this.state._isMounted &&
            this.setState({
              products: res.data,
              productsLoaded: true,
              productsExisting: res.data.length > 0 ? true : false,
            });
        })
        .catch((error) => {
          this.setState({
            productsLoaded: false,
            productsExisting: false,
          });
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  render() {
    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
    };

    // If user is logged in, call API and show recommended products
    if (this.props.auth) {
      const products = this.state.products;
      const loaded = this.state.productsLoaded;
      return (
        <div className="index-content">
          <section className="left"></section>
          <div className="recommended-products">
            <h3 className="text-center font-weight-bold mt-4 mb-1">
              {" "}
              Recommended for you{" "}
            </h3>
            <p className="text-center mb-2">
              {" "}
              We recommend products that you have previously serviced{" "}
            </p>
            <Slider {...settings}>
              {products.map((product) => (
                <Product
                  auth={this.state.auth}
                  id={product.id}
                  key={product.id}
                  product={product}
                ></Product>
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    // If user is not logged in
    return <div>Index page</div>;
  }
}
