import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaTrashAlt, FaRegCheckCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart, incrementItem, decrementItem, incrementCartItem, decrementCartItem, removeCartItem, emptyCart } from "../../redux/actions/cart";

// Components
import Button from "../Button";

// StyledComponents
import {
  ProductWrapper,
  LeftSide,
  RightSide,
  ImageContainer,
  Title,
  Description,
  CategoryTag,
  Price,
  ButtonsWrapper,
  CategoriesTags,
} from "./styles";

import './cart.css';
import { UnitsAmountWrapper } from "../UnitsAmount/styles";
import Cart from '../../assets/icons/shopping_cart.svg';
import { addUserCart } from "../../redux/actions/user";
import PaymentForm from "../PaymentForm";
import Axios from "axios";





const CartItem = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { userOrders } = useSelector(state => state.order);
  const { cart, cartAmount } = useSelector(state => state.cart);
  const { isUser, user } = useSelector(state => state.user);
  let orderId;
  for (var i = 0; i < userOrders.length; i++) {
    if (userOrders[i].status === "on_cart") {
      orderId = userOrders[i].id;
    }

  }

  const [data, setData] = useState("");

  useEffect(() => {
    Axios
      .post("http://localhost:5000/mercadopago", { orderId })
      .then((res) => {
        setData(res.data);
        console.info('Contenido de data:', data);
      })
      .catch(err => console.error(err));
  }, [orderId]);




  const getTotal = () => {
    return Number(cart.reduce((sum, { price, quantity }) => sum + Number(price) * quantity, 0).toFixed(2));
  };

  if (!cartAmount) {
    return (
      <section>
        <div className="section-div">
          <form>
            <div className="cart-top">
              <h1 className="cart-title">
                Shopping Cart <span className="row-title-note">
                  ({cartAmount} Items)
                    </span>
              </h1>
            </div>
            <div className="empty-Cart">
              <div className="empty-body"></div>
              <div className="message">
                <div className="info-msg">
                  <p>
                    <strong>Oh... seems like the cart is empty...</strong>
                    <br />
                    <br />
                    Looking for shopping ideas? Let's head to <Link id="lnk-under">Best Deals</Link> and start a shopping spree!
                    <br />
                    <br />
                    Or
                    <Link id="lnk-under" to="/login"> Log in</Link> and pick up from where you have left off last time.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      /* <section className='empty-cart'>
        <header>
          <h2 className='header'>YOUR CART</h2>
          <h4 className='header'>IS CURRENTLY EMPTY!!</h4>
          <div className="content">
            <img className="cart" src={Cart} alt="Empty cart" />
          </div>
        </header>
      </section> */
    );
  }

  const removeFromCart = (idToRemove) => {
    dispatch(removeItemFromCart(idToRemove));
    isUser && dispatch(addUserCart(user.id));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
    isUser && dispatch(addUserCart(user.id));
  };

  const toCheckout = () => {
    history.push("/login");
  };




  return (
    <section className="page-section">
      {isUser ?
        <div className="page-section-inner">
          <div className="row has-flex-summary">
            <form>
              <div id="cart-top" className="row-top display-flex justify-content-space-between width-100">
                <div className="row-top-left flex-wrap width-100">
                  <h1 className="row-title">
                    Shopping Cart <span className="row-title-note">
                      ({cartAmount} Items)
                    </span>
                  </h1>
                </div>
                <div className="display-flex icons-side">
                  <button type="button" className="btn no-border" onClick={() => clearAllItems()}> <FaTrashAlt className="fa fa-trash" /> Remove All
                  </button>
                </div>
              </div>
              <div className="row-inner">
                <div className="row-body">
                  <div className="item-cells-wrap tile-cells items-list-view absolute-img-cells">
                    {
                      cart.map((item) =>
                        <div className="item-cell">
                          <div className="item-container">
                            <Link className="item-img" target="_blank">
                              <img src={item.product.images[0]} alt={item.product.name} />
                            </Link>
                            <div className="item-info">
                              <Link id="a" className="item-title" to={"product/" + item.product.id}>
                                {item.product.name}
                              </Link>
                              {item.product.categories.map(category => (
                                <p>
                                  <strong>{category.name}</strong>
                                </p>
                              ))}
                              <ul className="item-description">
                                <p>{item.description}</p>
                              </ul>
                            </div>
                            <div className="item-qty">
                              <div className="qty-box">
                                <input value={item.quantity} className="qty-box-input" />
                                <button type="button" className="qty-box-up" onClick={() => dispatch(incrementItem(item.product.id)) && isUser && dispatch(incrementCartItem(item.product.id))}>
                                  <FaCaretUp />
                                </button>
                                <button type="button" className="qty-box-down" onClick={() => item.quantity > 1 && dispatch(decrementItem(item.product.id)) && isUser && dispatch(decrementCartItem(item.product.id))}>
                                  <FaCaretDown />
                                </button>
                              </div>
                            </div>
                            <div className="item-action">
                              <ul className="price">
                                <li className="price-current">
                                  $
                                <strong>{Number(item.price * item.quantity).toFixed(2)}</strong>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="item-sub-container no-border-top flex-wrap">
                            <div className="display-flex">
                              <button type="button" className="btn btn-mini btn-tertiary" onClick={() => dispatch(removeCartItem(item.id, orderId)) && removeFromCart(item.id)}>
                                <FaTrashAlt className="fa fa-trash" /> Remove
                          </button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div></div>
                <div className="row-side">
                  <div className="summary-side">
                    <h3 className="summary-title fixed-hide">Summary</h3>
                    <div className="summary-wrap">
                      <div className="summary-content">
                        <ul>
                          <li className="summary-content-global">
                            <label>
                              Total Price:
                          </label>
                            <span>
                              $<strong>{getTotal()}</strong>
                            </span>
                          </li>
                        </ul>
                        <div className="summary-actions">
                          {/* <button type="button" className="btn btn-primary btn-wide" onClick={toCheckout}>
                            To Checkout
                        </button> */}
                          {data &&
                            <PaymentForm data={data} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        :
        <div className="page-section-inner">
          <div className="row has-flex-summary">
            <form>
              <div id="cart-top" className="row-top display-flex justify-content-space-between width-100">
                <div className="row-top-left flex-wrap width-100">
                  <h1 className="row-title">
                    Shopping Cart <span className="row-title-note">
                      ({cartAmount} Items)
                    </span>
                  </h1>
                </div>
                <div className="display-flex icons-side">
                  <button type="button" className="btn no-border" onClick={() => clearAllItems()}> <FaTrashAlt className="fa fa-trash" /> Remove All
                  </button>
                </div>
              </div>
              <div className="row-inner">
                <div className="row-body">
                  <div className="item-cells-wrap tile-cells items-list-view absolute-img-cells">
                    {
                      cart.map((item) =>
                        <div className="item-cell">
                          <div className="item-container">
                            <Link className="item-img" target="_blank">
                              <img src={item.images[0]} alt={item.name} />
                            </Link>
                            <div className="item-info">
                              <Link id="a" className="item-title" to={"product/" + item.id}>
                                {item.name}
                              </Link>
                              {item.categories.map(category => (
                                <p>
                                  <strong>{category.name}</strong>
                                </p>
                              ))}
                              <ul className="item-description">
                                <p>{item.description}</p>
                              </ul>
                            </div>
                            <div className="item-qty">
                              <div className="qty-box">
                                <input value={item.quantity} className="qty-box-input" />
                                <button type="button" className="qty-box-up" onClick={() => dispatch(incrementItem(item.id)) && isUser && dispatch(incrementCartItem(item.id))}>
                                  <FaCaretUp />
                                </button>
                                <button type="button" className="qty-box-down" onClick={() => item.quantity > 1 && dispatch(decrementItem(item.id)) && isUser && dispatch(decrementCartItem(item.id))}>
                                  <FaCaretDown />
                                </button>
                              </div>
                            </div>
                            <div className="item-action">
                              <ul className="price">
                                <li className="price-current">
                                  $
                                <strong>{Number(item.price * item.quantity).toFixed(2)}</strong>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="item-sub-container no-border-top flex-wrap">
                            <div className="display-flex">
                              <button type="button" className="btn btn-mini btn-tertiary" onClick={() => dispatch(removeCartItem(item.id)) && removeFromCart(item.id)}>
                                <FaTrashAlt className="fa fa-trash" /> Remove
                          </button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div></div>
                <div className="row-side">
                  <div className="summary-side">
                    <h3 className="summary-title fixed-hide">Summary</h3>
                    <div className="summary-wrap">
                      <div className="summary-content">
                        <ul>
                          <li className="summary-content-global">
                            <label>
                              Total Price:
                          </label>
                            <span>
                              $<strong>{getTotal()}</strong>
                            </span>
                          </li>
                        </ul>
                        <div className="summary-actions">
                          <button type="button" className="btn btn-primary btn-wide" onClick={toCheckout}>
                            To Checkout
                        </button>
                          {data &&
                            <PaymentForm data={data} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </section>
  );
};

export default CartItem;