import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOrderDetail } from '../../redux/actions/order';
import './orderDetail.css';

const OrderDetail = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUser, user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!isUser) {
  //     history.push('/');
  //   }
  // }, [history, isUser]);

  const index = match.params.id;
  const orderDetail = useSelector(state => state.order.orderDetail);

  useEffect(() => {
    dispatch(getOrderDetail(user.id));
    orderDetail && setLoading(true);
  }, [loading]);

  console.log('index:', index);
  console.log('orderDetail:', orderDetail);


  // const getTotal = () => {
  //   return Number(userOrder[index].orderLines.reduce((sum, { price, quantity }) => sum + Number(price) * quantity, 0).toFixed(2));
  // };

  return (
    <>
      {loading ?

        <section className='order-section'>
          <header className='order-header'>
            <div className='header-description-container'>
              <div className='header-button-container'>
              </div>
              <h2>#Order Number: {orderDetail.id}</h2>
              <h1>Status: {orderDetail.status}</h1>
              <h4>Deliver date 15-01-2021</h4>
            </div>
          </header>
          {orderDetail.orderLines && orderDetail.orderLines.map(el =>
            <main className='order-main'>
              <div className='order-img'>
                <img className='order-img' src={el.product.images[0]} alt='product1' />
              </div>
              <div className='order-description'>
                <h4>{el.product.name}</h4>
                <h3>SubTotal</h3>
                <h4>Price: $ {el.price} x {el.quantity} unit</h4>
              </div>
            </main>
          )}
          <footer className='order-footer'>
            <h4>Paymetn method: cash</h4>
            <h4>Delivery Cost: $ 0 </h4>
            {/* <h3>Total:{getTotal()} </h3> */}
          </footer>
        </section>
        :
        <h1>Loading...</h1>
      }
    </>
  );
};

export default OrderDetail;