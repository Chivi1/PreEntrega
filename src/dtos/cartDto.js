class CartDTO {
  constructor(products) {
    this.products = products;
  }

  toObject() {
    return { products: this.products };
  }
}

export default CartDTO;
