import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/actions/user';

// Styles
import './styles.css';
import { MdAccountCircle } from "react-icons/md";

const LoggedInUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const onSubmit = (user) => {
    dispatch(logOutUser(user));
  };

  return (
    <Dropdown className='Dropdown' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='DropdownToggle'>
        {user.avatar ?
          <img className='Avatar' src={user.avatar} />
          :
          <MdAccountCircle className='Avatar' />}

      </DropdownToggle>

      <DropdownMenu right>
        <DropdownItem className='UserName'>{user.firstName}</DropdownItem>

        <DropdownItem divider />

        <DropdownItem>
          <Link to='/user/account' className='LinkItem'>Profile</Link>
        </DropdownItem>

        <DropdownItem>
          <Link to='/user/orders' className='LinkItem'>Orders</Link>
        </DropdownItem>

        <DropdownItem>
          <Link to='/user/reviews' className='LinkItem'>Reviews</Link>
        </DropdownItem>

        <DropdownItem divider />

        <DropdownItem>
          <Link to='/' className='LinkItem' onClick={onSubmit}>Log Out</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LoggedInUser;