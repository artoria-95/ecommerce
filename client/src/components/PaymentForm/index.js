import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PaymentFormWrapper } from './styles';

const PaymentForm = ({ data }) => {


  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    const script = document.createElement('script');

    const attr_data_preference = document.createAttribute('data-preference-id');
    attr_data_preference.value = data.id;

    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    document.getElementById('form1').appendChild(script);
    return () => {
      document.getElementById('form1').removeChild(script);
    };
  }, []);

  return (
    <PaymentFormWrapper id='form1'>
      {/* {
        cart.map((product, i) => (
          <div key={i}>
            <ul>
              <li>{product.name}</li>
              <li>{'$' + product.price}</li>
              <li>{product.quantity}</li>
            </ul>
          </div>
        ))
      } */}
    </PaymentFormWrapper>
  );
};

export default PaymentForm;
