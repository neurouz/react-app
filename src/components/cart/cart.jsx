import React, { useState, useEffect } from "react";
import Unauthorized from "../auth/unauthorized";
import CartService from "../../services/cartService";
import LocalStorageService from "../../services/LocalStorageService";
import APIService from "../../services/apiService";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import EmptyCart from "../../images/empty_cart.png";
import "../../styles/cart.css";

export default function Cart(props) {
  const [products, setProducts] = useState([]);
  const [orderTotal, setOrdertotal] = useState(0.0);
  const [modal, isOpenModal] = useState(false);
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });

  Modal.setAppElement(document.querySelector("body"));

  useEffect(() => {
    let productsFromCart = CartService.GetProductsFromCart();
    if (productsFromCart) {
      setProducts([...productsFromCart]);
      setOrdertotal(calculateTotal());
    }
  }, []);

  const ModalStyles = {
    content: {
      padding: "20px 20px 35px 20px",
      height: "fit-content",
      margin: "auto",
      width: "50%",
      transition: "all .5s",
    },
  };

  const openModal = () => {
    isOpenModal(true);
  };

  const closeModal = () => {
    isOpenModal(false);
  };

  const calculateTotal = () => {
    var currentCart = CartService.GetProductsFromCart();
    return currentCart.reduce((previous, current) => {
      return previous + current.price * Number.parseInt(current.quantity, 10);
    }, 0);
  };

  const handleInputChange = (e, id) => {
    let items = [...products];
    let product = products.find((product) => product.id === id);
    let index = products.indexOf(product);

    let item = { ...items[index] };
    item.quantity = e.target.value;
    items[index] = item;

    let send = Object.assign(item);
    delete send.quantity;
    CartService.AddToCart(send, e.target.value, true);

    setProducts(CartService.GetProductsFromCart());
    setOrdertotal(calculateTotal());
  };

  const handleRemove = (e, id) => {
    var removedProduct = products.find((product) => product.id === id);
    delete removedProduct.quantity;

    CartService.RemoveFromCart(removedProduct);
    setProducts(CartService.GetProductsFromCart());
    setOrdertotal(calculateTotal());
  };

  const handleRemoveAll = (e) => {
    CartService.ClearCart();
    setProducts(CartService.GetProductsFromCart());
    setOrdertotal(calculateTotal());
  };

  const orderSubmit = (data) => {
    // Fetching data
    data.customerId = LocalStorageService.GetJsonData().customerId;
    data.products = [];
    data.quantities = [];
    products.forEach((product) => {
      data.products.push(product.id);
      data.quantities.push(Number.parseInt(product.quantity, 10));
    });

    console.log(JSON.stringify(data));

    // POST data
    APIService.PostWithAuthAsync("Order", data, LocalStorageService.GetApiKey())
      .then((response) => {
        toastr.success("Your order is confirmed", "Info");
        closeModal();
        handleRemoveAll();
      })
      .catch((error) => {
        toastr.error("An error occured", "Server error");
      });
  };

  if (props.auth && products.length === 0) {
    return (
      <div className="cart-empty">
        <img src={EmptyCart} alt="Empty cart"></img>
        <h3> Your cart is empty! </h3>
        <p>
          {" "}
          Go to our{" "}
          <Link
            to={{
              pathname: "/products",
              auth: props.auth,
            }}
          >
            <b>Products</b>
          </Link>{" "}
          page to make a order!
        </p>
      </div>
    );
  }

  if (props.auth) {
    return (
      <div className="table-parent">
        <h4 className="title">Items in cart</h4>
        <hr /> <br />
        <table className="table table-sm table-borderless">
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td style={{ paddingRight: "15px" }}>
                  <b> {index + 1}. </b>
                </td>
                <td className="crop">
                  <img
                    src={"data:image/png;base64," + product.image}
                    alt="Product"
                    className="cart-product-image"
                  ></img>
                </td>
                <td> {product.productName} </td>
                <td>
                  {" "}
                  <b>Price: </b> BAM {product.price}{" "}
                </td>
                <td className="quantity">
                  <b>Quantity</b>
                  <input
                    min="1"
                    onChange={(e) => handleInputChange(e, product.id)}
                    type="number"
                    defaultValue={product.quantity}
                    className="form-control"
                  ></input>
                </td>
                <td>
                  <b>Total price: </b>BAM{" "}
                  {(
                    product.price * Number.parseInt(product.quantity, 10)
                  ).toFixed(2)}
                </td>
                <td>
                  <button
                    onClick={(e) => handleRemove(e, product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-trash-alt"></i>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="order-total">
          <h5>
            {" "}
            <b>Order total: BAM {orderTotal.toFixed(2)}</b>
          </h5>
        </div>
        <hr /> <br />
        <div className="buttons">
          <button onClick={openModal} className="btn btn-primary btn-submit">
            <i className="fa fa-trash-alt"></i>
            Submit order
          </button>
          <button
            onClick={handleRemoveAll}
            className="btn btn-outline-danger btn-remove-all"
          >
            Remove all
          </button>
        </div>
        {/* Modal goes here */}
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={ModalStyles}
          closeTimeoutMS={500}
        >
          <button
            onClick={closeModal}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 className="text-center title">Submit order</h2>
          <p className="text-center subtitle">
            Please fill out the form below before submitting your order.
          </p>
          <form
            onSubmit={handleSubmit(orderSubmit)}
            style={{ marginTop: "40px" }}
          >
            <div className="form-group">
              <label htmlFor="address">
                <b>Shipping address</b>
              </label>
              <input
                name="shippingAddress"
                type="text"
                className="form-control"
                ref={register({ required: "Shipping address is required" })}
              ></input>
            </div>
            {errors.shippingAddress && <p>{errors.shippingAddress.message}</p>}

            <div className="form-group">
              <label htmlFor="phone">
                <b>Contact number</b>
              </label>
              <input
                name="contactNumber"
                type="text"
                className="form-control"
                ref={register({ required: "Contact number is required" })}
              ></input>
            </div>
            {errors.contactNumber && <p>{errors.contactNumber.message}</p>}

            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Submit"
            />
          </form>
        </Modal>
      </div>
    );
  }

  // If user is not authorized
  return <Unauthorized></Unauthorized>;
}
