import { discountModel } from "./discount";

export interface productCart {
  discounts?: discountModel[];
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface cartModel {
  cart_cartId: string;
  cart_userId: string;
  cart_state: string;
  cart_products: productCart[];
}
