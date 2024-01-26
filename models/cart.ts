import { discountModel } from "./discount";

export interface productCart {
  productId: string;
  productType: string;
  quantity: number;
  old_quantity?: number;
  rating?: number;
  img?: string;
  name?: string;
  price?: number;
  discounts?: discountModel[];
}

export interface cartModel {
  cart_cartId: string;
  cart_userId: string;
  cart_state: string;
  cart_products: productCart[];
}
