import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createNewUser } from "../../redux/actions/user";

// Styles
import './styles.css';

export default function UserRegister() {

  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  const history = useHistory();
  password.current = watch('password', '');

  const dispatch = useDispatch();

  const onSubmit = (user) => {
    dispatch(createNewUser(user));
    history.push("/login");
  };

  return (
    <section>
      <div>
        <section>
          <div>
            <h1 className='Registration'>Registration</h1>
          </div>
        </section>
        <div className="card">
          <div id='div1'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <section>
                  <div className='div2'>
                    <h2 className='h2global'>Create a new account</h2>
                  </div>
                </section>
                <label className='globalLabel'>First name</label>
                {errors.firstName && <span className='globalSpan text-danger'> Invalid first name.</span>}
                <input
                  name="firstName" className='globalInput' ref={register({ required: true, minLength: 2, maxLength: 40, pattern: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/ })}
                />
                <label className='globalLabel'>Last name</label>
                {errors.lastName && <span className='globalSpan text-danger'>Invalid last name.</span>}
                <input
                  name="lastName" className='globalInput' ref={register({ required: true, minLength: 2, maxLength: 40, pattern: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/ })}
                />
                <label className='globalLabel'>Birthdate</label>
                {errors.birthdate && <span className='globalSpan text-danger'> Invalid birthdate.</span>}
                <input
                  name="birthdate" className='globalInput' placeholder='YYYY-MM-DD' ref={register({ required: true, pattern: /^(19|20)\d{2}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12]\d|3[01])$/ })}
                />
                <label className='globalLabel'>Email</label>
                {errors.email && <span className='globalSpan text-danger'> Invalid email address.</span>}
                <input
                  name="email" className='globalInput' ref={register({ required: true, maxLength: 76, pattern: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/ })}
                />
                <label className='globalLabel'>Password</label>
                {errors.password && <span className='globalSpan text-danger'>{errors.password.message}</span>}
                <input
                  name="password"
                  type="password" className='globalInput' ref={register({
                    required: 'You must specify a password.',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
                    }
                  })}
                />
                <label className='globalLabel'>Repeat your password</label>
                {errors.checkpassword && <span className='globalSpan text-danger'>{errors.checkpassword.message}</span>}
                <input
                  name="checkpassword"
                  type="password" className='globalInput' ref={register({
                    validate: value =>
                      value === password.current || 'The passwords do not match.'
                  })}
                />
              </div>
              <div className='div3'>
                <input className="inputButton" type="submit" value="Register" />
              </div>
              <section className='section1'>
                <div className='div4'>
                  <div style={{
                    paddingBottom: ".5rem"
                  }}>
                    <h2 className='h2global'>Have an account?</h2>
                  </div>
                </div>
              </section>
              <div className='div3'>
                <Link to="/login"><button className='linkButton'>Log In</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
