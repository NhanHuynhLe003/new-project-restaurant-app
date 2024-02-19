export interface CheckoutModel {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  district: string;
  city: string;

  phone: string;
  zipCode: string;
  totalPrice: number;
  billingAddress: boolean;
}
