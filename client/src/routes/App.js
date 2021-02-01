import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../redux/actions/product";
import { getCategories } from "../redux/actions/category";
import { getCartItemsFromLocalStorage, getUserCart } from "../redux/actions/cart";
import { getUserOrders } from '../redux/actions/order';
import { autoSignInUser } from "../redux/actions/user";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Layout from '../containers/Layout/Layout';
import Home, { SlideData } from '../containers/Home/Home';
import NotFound from '../containers/NotFound/NotFound';
import Catalogue from '../components/Catalogue';
import ProductTable from '../components/ProductTable';
import Product from '../components/Product';
import TableOrder from '../components/OrderTable';
import UserRegister from '../components/RegisterForm';
import EditProfile from '../components/EditProfile';
import Cart from '../components/Cart/Cart';
import LoginUser from '../components/LoginForm';
import userTable from '../components/UserTable';
import OrderContainer from '../components/OrderContainer/OrderContainer';
import Order from '../components/Order/Order';
import ForcePasswordChangePage from '../containers/ForcePasswordChangePage';
import CheckoutShipping from '../containers/CheckoutShipping';
import MercadoPago from '../components/MercadoPagoButton/MercadoPago';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import ReviewPage from '../containers/ReviewPage';


function App() {

  const dispatch = useDispatch();
  const { user, isUser, loading } = useSelector(state => state.user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) dispatch(autoSignInUser(token));
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getCartItemsFromLocalStorage());
    console.log(user, isUser);
    if (isUser) {
      dispatch(getUserOrders(user.id));
      dispatch(getUserCart(user.id));
    }
  }, [dispatch, isUser]);

  if (loading) return <h1>Loading ...</h1>;

  return (

    <BrowserRouter>
      <Switch>
        {/* Para rutas sin el Header ni el Footer */}
        <Route exact path='/changePassword' component={ForcePasswordChangePage} />
        {/* <Route exact path="/checkout" component={CheckoutShipping} /> */}
        <Route exact path="/reviews/:orderId" component={ReviewPage} />
        <Layout>
          <Switch>

            <Route exact path='/'>
              <Home slides={SlideData} />
            </Route>
            <Route path='/products' component={Catalogue} />

            <Route path='/cart' component={Cart} />

            <Route path='/product/:id' render={({ match }) => <Product match={match} />} />

            <Route exact path="/user/account" component={EditProfile} />

            <Route exact path='/login' component={LoginUser} />

            <Route exact path="/register" component={UserRegister} />

            <Route path='/admin/products' component={ProductTable} />

            <Route exact path='/admin/orders' component={TableOrder} />

            <Route exact path='/admin/orders/:id' render={({ match }) => <OrderDetail match={match} />} />

            <Route exact path='/admin/users' component={userTable} />

            <Route exact path="/user/account" component={EditProfile} />

            <Route exact path='/user/orders' component={OrderContainer} />

            <Route exact path='/user/orders/:id' render={({ match }) => <Order match={match} />} />

            <Route exact path='/mercadopago' component={MercadoPago} />

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;