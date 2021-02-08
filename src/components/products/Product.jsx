import "../../styles/product.css";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.min.css";

import toastr from "toastr";
import React, { Component } from "react";
import CartService from "../../services/cartService";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.product,
    };
  }
  handleClick = (id) => {
    CartService.AddToCart(this.state.data, 1);
    toastr.info("Added to cart", "Info");
  };
  render() {
    return (
      <div className="product-card">
        <figure className="snip1418">
          <img
            src={"data:image/png;base64," + this.state.data.image}
            alt="product"
            height="200"
          />
          <div
            onClick={() => this.handleClick(this.props.id)}
            id={this.props.id}
            className="add-to-cart"
          >
            <i className="ion-android-add"></i>
            <span>Add to Cart</span>
          </div>
          <figcaption>
            <h3>{this.state.data.productName}</h3>
            <p>Dimensions: {this.state.data.description}</p>
            <p>Condition: {this.state.data.condition}</p>
            <div className="price">
              <s>BAM {this.state.data.price + 13.75}</s>BAM{" "}
              {this.state.data.price}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}
