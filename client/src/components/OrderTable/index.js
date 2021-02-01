import React, { useEffect, useState } from 'react';
import { getAllOrdersAction, putOrderStatus, sendReviewEmail } from '../../redux/actions/order';
import { useHistory } from 'react-router';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from './Select';
import style from './index.module.scss';

import Button from '../Button';

import { ButtonsWrapper } from './styles';
import { Link } from 'react-router-dom';


const TableOrder = ({ getAllOrdersAction }) => {
  const history = useHistory();

  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push('/');
    }
  }, []);


  useEffect(() => {
    getAllOrdersAction();
  }, [getAllOrdersAction]);

  let orders = useSelector(state => state.order.allOrders);

  const handleChange = async (e, id) => {

    let resp = window.confirm(`Desea cambiar el estado de la orden a ${e.target.value}`);
    const selectedOrder = orders.filter(o => o.id === id);
    const { email } = selectedOrder[0].user;

    if (resp === true) {
      switch (e.target.value) {
        case 'CREATED':
          await putOrderStatus(id, 'created');
          await sendReviewEmail(id, email, 'created');
          await getAllOrdersAction();  // Para que refrersque el state y renderize los cambios!
          break;
        case 'COMPLETED':
          await putOrderStatus(id, 'completed');
          await sendReviewEmail(id, email, 'completed');
          await getAllOrdersAction();
          break;
        case 'CANCELLED':
          await putOrderStatus(id, 'cancelled');
          await sendReviewEmail(id, email, 'cancelled');
          await getAllOrdersAction();
          break;
        default:
          break;
      }
    }
  };

  const [filter, setFilter] = useState('id');
  const [order, setOrder] = useState(true);

  const handleFilter = (e) => {
    e.preventDefault();
    setOrder(!order);
    setFilter(e.target.name);
    if (filter === 'status') {
      orders = order ? orders.sort((a, b) => a[filter].toUpperCase() > b[filter].toUpperCase() ? 1 : -1) : orders.sort((a, b) => a[filter].toUpperCase() < b[filter].toUpperCase() ? 1 : -1);
    } else {
      orders = order ? orders.sort((a, b) => a[filter] > b[filter] ? 1 : -1) : orders.sort((a, b) => a[filter] < b[filter] ? 1 : -1);
    }
  };

  return (
    <div className="App">
      <h2 id='prodList' class="alert alert-info">Orders List</h2>
      <div id='ordTabl'>
        <Link to='/admin/products' >
          <button className="btn btn-info">Products</button>
        </Link>
        <Link to='/admin/users' >
          <button className="btn btn-info">Users</button>
        </Link>
      </div>
      <section>
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ width: '3rem' }}><ButtonsWrapper><Button className={filter === 'id' ? order ? style.asc : style.des : null} name='id' onClick={handleFilter}>ID</Button></ButtonsWrapper></th>
              <th><ButtonsWrapper><Button className={filter === 'user' ? order ? style.asc : style.des : null} name='user' onClick={handleFilter}>User</Button></ButtonsWrapper></th>
              <th><ButtonsWrapper><Button className={filter === 'status' ? order ? style.asc : style.des : null} name='status' onClick={handleFilter}>Status</Button></ButtonsWrapper></th>
              <th><ButtonsWrapper><Button className={filter === 'creation' ? order ? 'asc' : 'desc' : null} name='creation' onClick={handleFilter}>Creation Date</Button></ButtonsWrapper></th>
              <th><ButtonsWrapper><Button className={filter === 'update' ? order ? style.asc : style.des : null} name='update' onClick={handleFilter}>Modification Date</Button></ButtonsWrapper></th>
              <th style={{ width: '176px' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders !== undefined &&
              orders.map(({ id, user, status, createdAt, updatedAt }, index) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{user.email}</td>
                  <td>{status}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                  <td>{new Date(updatedAt).toLocaleString()}</td>


                  <td style={{ display: "flex" }}>
                    <ButtonsWrapper>
                    <Link to={`/admin/orders/${id}`}>
                      <Button>
                          <i className="fas fa-search">Order Detail</i>
                      </Button>
                    </Link>
                    </ButtonsWrapper>
                    <Select status={status} id={id} handleChange={handleChange} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state: state.orders_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ putOrderStatus, getAllOrdersAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrder);
