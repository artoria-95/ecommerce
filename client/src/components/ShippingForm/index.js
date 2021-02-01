import React from 'react';
import Input from '../Input';
import { ShippingFormWrapper } from './styles';

const ShippingForm = ({ checkoutData, handleChange }) => {
  return (
    <ShippingFormWrapper>
      <Input name="postalCode" label="Codigo Postal" value={checkoutData.postalCode} onChange={handleChange} />
      <Input name="state" label="Provincia" value={checkoutData.state} onChange={handleChange} />
      <Input name="city" label="Ciudad" value={checkoutData.city} onChange={handleChange} />
      <Input name="street" label="Calle" value={checkoutData.street} onChange={handleChange} />
      <Input name="number" label="Numero" value={checkoutData.number} onChange={handleChange} />
      <Input name="floor" label="Piso" value={checkoutData.floor} onChange={handleChange} />

      <Input type="submit" value="Siguiente" />
    </ShippingFormWrapper>
  );
};

export default ShippingForm;
