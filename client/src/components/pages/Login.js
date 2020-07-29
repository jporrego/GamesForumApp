import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <LoginStyle>
      <LoginForm onSubmit={onSubmit}>
        <LoginFormTitle>Login</LoginFormTitle>

        <LoginFormItem>
          <LoginFormLabel for="email">Email Address</LoginFormLabel>
          <LoginFormItemInput
            name="email"
            type="email"
            value={email}
            onChange={onChange}
          ></LoginFormItemInput>
        </LoginFormItem>

        <LoginFormItem>
          <LoginFormLabel for="password">Password</LoginFormLabel>
          <LoginFormItemInput
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          ></LoginFormItemInput>
        </LoginFormItem>
        <LoginFormSubmit type="submit" value="Login"></LoginFormSubmit>
      </LoginForm>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  max-width: 1200px;
  margin: 10rem auto;
  background-color: var(--dark-color);
  color: var(--font-color-white);
  border-top: 5px solid var(--primary-color);
  padding: 2rem;
`;

const LoginForm = styled.form`
  display: grid;
  gap: 2rem;
`;

const LoginFormTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid var(--font-color-white);
  padding-bottom: 1rem;
`;

const LoginFormItem = styled.div`
  display: grid;
`;

const LoginFormItemInput = styled.input`
  background-color: var(--bg-color);
  height: 3.5rem;
  border-radius: 0.5rem;
  padding: 0px 1rem;
  border-style: none;
  font-weight: 500;
  color: var(--font-color-white);
`;

const LoginFormLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
`;

const LoginFormSubmit = styled.input`
  background-color: var(--primary-color);
  height: 3.5rem;
  width: 25%;
  justify-self: center;
  border-radius: 0.5rem;
  padding: 0px 1rem;
  border-style: none;
  font-weight: 700;
  color: var(--font-color-white);
  transition: all 0.15s ease-out;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;
export default Login;
