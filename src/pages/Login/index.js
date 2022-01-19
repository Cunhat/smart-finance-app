/* eslint-disable no-debugger */
import React from 'react';
import './styles.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card-title">
          <h1>Sign in to our platform</h1>
        </div>
        <div className="login-card-forms">
          <p className="login-card-label">Your Email</p>
          <input className="form-control-login" type="text" placeholder="Email" />
          <p className="login-card-label">Your Password</p>
          <input className="form-control-login" type="text" placeholder="Password" />
        </div>
        <div className="remember-me-forms">
          <input className="checkbox-input-login" type="checkbox" />
          <p className="login-card-label">Lost password?</p>
        </div>
        <button className="btn-log-in" type="submit">
          Sign in
        </button>
        <section className="create-account-section">
          <b className="create-account-label">Not registered? Create account</b>
        </section>
      </div>
    </div>
  );
}

export default Login;
