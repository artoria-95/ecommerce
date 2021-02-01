import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserOrders } from '../../redux/actions/order';
import './order.css';

const Order = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUser, user } = useSelector(state => state.user);

  useEffect(() => {
    if (!isUser) {
      history.push('/');
    }
  }, [history, isUser]);

  // useEffect(() => {
  //   dispatch(getUserOrders(user.id));
  // }, [isUser]);

  const index = match.params.id;
  const userOrder = useSelector(state => state.order.userOrders);

  console.log('index:', index)
  console.log('userOrder:', userOrder)


  const getTotal = () => {
    return Number(userOrder[index].orderLines.reduce((sum, { price, quantity }) => sum + Number(price) * quantity, 0).toFixed(2));
  };

  return (
    <>
      <section className='order-section'>
        <header className='order-header'>
          <div className='header-description-container'>
            <div className='header-button-container'>
            </div>
            <h2>#Order Number: {userOrder[index].id}</h2>
            <h1>Status: {userOrder[index].status}</h1>
            <h4>Deliver date 15-01-2021</h4>
          </div>
        </header>
        {userOrder[index].orderLines.map(el =>
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
          <h3>Total:{getTotal()} </h3>
        </footer>
      </section>
    </>
  );
};

export default Order;