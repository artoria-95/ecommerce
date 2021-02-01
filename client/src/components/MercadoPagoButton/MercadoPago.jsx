import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './styles.css';
import { useSelector } from 'react-redux';

const MercadoPago = () => {
  
  const { cart } = useSelector(state => state.cart);

  const [datos, setData] = useState("")


  useEffect(() => {
    axios
      .post("http://localhost:5000/mercadopago",cart)
      .then((res) => {
        setData(res.data)
        console.info('Contenido de la response:', res)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const script = document.createElement('script'); //Crea un elemento html script

    const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
    attr_data_preference.value = datos.id  //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference)

    console.log(datos)

    //Agrega el script como nodo hijo del elemento form
    document.getElementById('form1').appendChild(script)
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById('form1').removeChild(script);
    }
  }, [datos])
  return (
    <>
      <form id='form1'>
      </form>

    </>
  )
}

export default MercadoPago;