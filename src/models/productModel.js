class Product {
    constructor({ name, description, price, category, stock, userId }) {
      this.name = name;
      this.description = description || '';
      this.price = price;
      this.category = category || 'general';
      this.stock = stock || 0;
      this.userId = userId;
      this.createdAt = new Date();
    }
  }
  
  module.exports = Product;  