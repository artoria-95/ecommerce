import React, { useEffect } from 'react';

// Components
import ChangePasswordForm from '../../components/ChangePasswordForm';

// Styled Compoents
import { ForcePasswordChangeWrapper } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/user';
import { useHistory } from 'react-router';

const ForcePasswordChangePage = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const { user, loading, isUser } = useSelector(state => state.user);

  useEffect(() => {
    if (!loading && isUser && !user.changePassword)
      history.push("/");
  }, [user, loading, isUser, history]);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    if (data.newPassword === data.rePassword)
      dispatch(changePassword(data.newPassword));
  };

  return (
    <ForcePasswordChangeWrapper>
      <ChangePasswordForm handleSubmit={handleSubmit} />
    </ForcePasswordChangeWrapper>
  );
};

export default ForcePasswordChangePage;
