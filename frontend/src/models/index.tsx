export interface Product {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  balance: number;
}

export interface Receipt {
  _id: string;
  orderDate: string;
  productID: string;
  productName: string;
  totalPrice: number;
}
