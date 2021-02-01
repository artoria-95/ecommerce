import React, { useState } from 'react';
import Input from '../Input';
import { Form } from './styles';

const ChangePasswordForm = ({ handleSubmit }) => {

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, values)}>
      {/* <Input name="currentPassword" type="password" label="Current Password" value={values.currentPassword} handleChange={handleChange} /> */}
      <Input name="newPassword" type="password" label="New Password" value={values.newPassword} handleChange={handleChange} />
      <Input name="rePassword" type="password" label="Repeat Password" value={values.rePassword} handleChange={handleChange} />
      <button>
        Change Password
      </button>
    </Form>
  );
};

export default ChangePasswordForm;
