import "../../styles/products.css";
import "bootstrap/dist/css/bootstrap.css";

import Loader from "../global/Loader";
import BottomLoader from "../global/BottomLoader";
import Product from "../products/Product";

import APIService from "../../services/apiService";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      auth: props.location.auth,
      page: 1,
      itemsPerPage: 6,
      hasMore: true,
    };
  }

  componentDidMount() {
    APIService.GetAsync(
      `Product?Page=${this.state.page}&ItemsPerPage=${this.state.itemsPerPage}`
    ).then((response) => {
      this.setState({
        data: response.data,
        isLoaded: true,
      });
    });
  }

  handleScroll = () => {
    APIService.GetAsync(
      `Product?Page=${this.state.page + 1}&ItemsPerPage=${
        this.state.itemsPerPage
      }`
    ).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          data: [...this.state.data, ...response.data],
          page: this.state.page + 1,
        });
      } else {
        this.setState({
          hasMore: false,
        });
      }
    });
  };

  render() {
    var { isLoaded, data, auth } = this.state;
    if (!isLoaded) {
      return <Loader></Loader>;
    } else {
      return (
        <div onScroll={this.handleScroll}>
          <h1 className="text-center font-weight-bold mt-4 mb-5">
            {" "}
            Available products{" "}
          </h1>
          <InfiniteScroll
            className="products-all"
            dataLength={data.length}
            next={this.handleScroll}
            hasMore={this.state.hasMore}
            loader={<BottomLoader></BottomLoader>}
          >
            {data.map((product) => (
              <Product
                auth={auth}
                id={product.id}
                key={product.id}
                product={product}
              ></Product>
            ))}
          </InfiniteScroll>
        </div>
      );
    }
  }
}
