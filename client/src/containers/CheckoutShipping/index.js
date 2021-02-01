import React, { useEffect } from 'react';

import CheckoutForm from '../../components/CheckoutForm';

import { CheckoutShippingWrapper } from "./styles";
import { useSelector } from 'react-redux';

const CheckoutShipping = () => {
  const orders = useSelector(state => state.order.userOrders);
  const [orderCart] = orders.filter(o => o.status == "on_cart" ? true : false);
  console.log(orders);
  return (
    <CheckoutShippingWrapper>
      {
        orderCart &&
        <CheckoutForm orderId={orderCart.id} />
      }
    </CheckoutShippingWrapper>
  );
};

export default CheckoutShipping;
