export interface CheckoutModel {
  order_userName: {
    user_firstName: string;
    user_lastName: string;
  };
  order_email: string;
  order_address: {
    user_street: string;
    user_district: string;
    user_city: string;
  };

  order_phoneNumber: string;
  order_zipCode: string;
  order_totalPrice: number;
  order_billingAddress: boolean;
}
