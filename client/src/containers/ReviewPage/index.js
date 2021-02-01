import React, { useEffect, useState } from 'react';
import ReviewForm from '../../components/ReviewForm';
import { ReviewPageWrapper, ReviewItemWrapper, ProductInfoWrapper, Title, Img } from "./styles.jsx";
import { useRouteMatch } from 'react-router';
import { getOrderDetail, getOrder } from '../../redux/actions/order';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsList from '../../components/ReviewsList';
import { Link } from 'react-router-dom';

const ReviewPage = () => {

  let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const { orderId } = match.params;

    dispatch(getOrder(orderId));

  }, []);


  const order = useSelector(state => state.order.orderDetail);
  const { user } = useSelector(state => state.user);
  console.log(order.orderLines);

  return (
    <ReviewPageWrapper>
      {
        !order || order.status !== "completed" || user.id !== order.userId ?
          <>
            <span>No tienes reviews pendientes </span>
            <Link to="/">Volver al Home</Link>
          </>
          :
          <>
            {/* <ReviewsList /> */}
            {
              order.orderLines.map((item, i) => {
                return (
                  <ReviewItemWrapper>
                    <ProductInfoWrapper>
                      <Title>{item.product.name}</Title>
                      <Img src={item.product.images[0]} />
                    </ProductInfoWrapper>

                    <ReviewForm productId={item.product.id} last={(i === (order.orderLines.length - 1))} />
                  </ReviewItemWrapper>
                );
              })
            }
          </>
      }
    </ReviewPageWrapper>
  );
};

export default ReviewPage;
