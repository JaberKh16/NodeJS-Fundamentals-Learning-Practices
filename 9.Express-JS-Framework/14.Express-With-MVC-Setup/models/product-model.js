const products = [];
const productModel = class Product {
    constructor(title, type, price) {
        this.title = title;
        this.type = type;
        this.price = price;
    }

    saveProduct() {
        products.push(this);
    }

    fetchProduct() {}
};

module.exports = productModel;
