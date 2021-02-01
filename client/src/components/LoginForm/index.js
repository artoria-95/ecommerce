import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../../redux/actions/user'
import '../LoginForm/style.css';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';

export default function LoginUser() {

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const isUser = useSelector(state => state.user.isUser)

  useEffect(() => {
    if (isUser) {
      history.push('/');
    }
  }, [isUser, history])


  const onSubmit = (user) => {
    dispatch(logInUser(user));
  };

  //const onSubmit = data => console.log("data:", data);

  return (
    <section className="main-wrapper xs-col-12">
      <div className="wrapper page-title">
        <section className="wrapper-section">
          <h1 id="title" className="pageTitle">Your Account</h1>
        </section>
      </div>
      <div className="pageContent">
        <section className="section-col">
          <div className="cArd">
            <div className="block">
              <form id="login-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                <section className="subTitle">
                  <div className="header-sub">
                    <h2 id="sub">Log In</h2>
                  </div>
                </section>
                <label for="email" className="label-email">E-mail </label>
                {errors.email && <span id="spn" className="text-danger">Invalid email adress.</span>}
                <input type="text" className="text-input" name="email" ref={register({
                  required: true,
                  maxLength: 76,
                  pattern: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/
                })} />
                <label for="password" className="label-password password">Password </label>
                {errors.password && <span id="spn" className="text-danger">Invalid password.</span>}
                <input type="password" className="text-input psw" name="password" ref={register({
                  required: 'You must specify a password.',
                  //  pattern: {
                  //  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/
                  //  }
                })} />
                <div className="wrapper-buttn-link">
                  <input type="submit" className="loged-button" value="Log In" />
                </div>
                <div className="wrapper-buttn-link">
                  <Link id="lnk" to="/reset/account/password"><p className="note">Forgot password?</p></Link>
                </div>
                <section className="subForm">
                  <div className="note2">
                    <p>Or login with </p>
                  </div>
                  <div className="separar">
                    {/*window.location = Retorna un objeto Location con información acerca de la ubicación actual del documento*/}
                    <button className="social-button" onClick={() => (window.location = 'http://localhost:5000/auth/login/google')}>
                      <FcGoogle className="iconGoogle" />
                      <div className="google">Login with Google</div>
                    </button>
                  </div>
                  <div className="separar">
                    <button className="social-button" onClick={() => (window.location = 'http://localhost:5000/auth/login/facebook')}>
                      <FaFacebookSquare className="iconFacebook" />
                      <div className="facebook">Login with Facebook</div>
                    </button>
                  </div>
                  <div className="header-subform">
                    <div>
                      <h2 id="sub">Don't have an account?</h2>
                    </div>
                  </div>
                </section>
                <div className="wrapper-button-form">
                  <Link id="lnk2" to="/register"><button className="register-button button--secondary button--small">Register here</button></Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}