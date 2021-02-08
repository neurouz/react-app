import React, { useState, useEffect } from "react";
import Unauthorized from "../auth/unauthorized";
import CartService from "../../services/cartService";

export default function Cart(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let productsFromCart = CartService.GetProductsFromCart();
    setProducts(productsFromCart);
    console.log(products);
  }, []);

  if (props.auth) {
    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Product image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{}</tbody>
        </table>
      </div>
    );
  }

  // If user is not authorized
  return <Unauthorized></Unauthorized>;
}
