export default class CartService {
  static AddToCart(item, quantity, update = false) {
    let encrypted = btoa(JSON.stringify(item));
    var previous_quantity = sessionStorage.getItem(encrypted);

    // If item is in cart
    if (previous_quantity) {
      sessionStorage.removeItem(encrypted);
      sessionStorage.setItem(
        encrypted,
        update
          ? Number.parseInt(quantity, 10)
          : Number.parseInt(previous_quantity, 10) +
              Number.parseInt(quantity, 10)
      );
    } else {
      sessionStorage.setItem(encrypted, quantity);
    }
  }

  static RemoveFromCart(item) {
    let encrypted = btoa(JSON.stringify(item));
    var cartItem = sessionStorage.getItem(encrypted);

    if (cartItem) {
      sessionStorage.removeItem(encrypted);
    }
  }

  static ClearCart() {
    sessionStorage.clear();
  }

  static GetProductsFromCart() {
    var array = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      var current = sessionStorage.getItem(sessionStorage.key(i));
      if (Number.parseInt(current, 10)) {
        let obj = atob(sessionStorage.key(i));
        let json = JSON.parse(obj);
        json.quantity = current;
        array.push(json);
      }
    }
    return array;
  }
}
