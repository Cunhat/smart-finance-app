/* eslint-disable no-debugger */
import React, { useRef } from 'react';
import './styles.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function Login() {
  const emailRef = useRef({});
  const passwordRef = useRef({});

  function hadleSignIn() {
    if (emailRef.current.value.length > 0 && passwordRef.current.value.length > 0) {
      alert('Sign In');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card-title">
          <h1>Sign in to our platform</h1>
        </div>
        <div className="login-card-forms">
          <p className="login-card-label">Your Email</p>
          <InputText
            value={emailRef.current.value}
            type="text"
            ref={emailRef}
            className="inputFormTrans"
            placeholder="Email"
            onChange={() => {}}></InputText>
          <p className="login-card-label">Your Password</p>
          <InputText
            value={passwordRef.current.value}
            ref={passwordRef}
            type="password"
            className="inputFormTrans"
            placeholder="Password"
            onChange={() => {}}></InputText>
        </div>
        <Button
          className="loginButton"
          label="Sign In"
          onClick={() => hadleSignIn()}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default Login;
