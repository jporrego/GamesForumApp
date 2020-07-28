import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated } = authContext;
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      username,
      email,
      password,
      password2,
    });
  };
  return (
    <RegisterStyle>
      <RegisterForm onSubmit={onSubmit}>
        <RegisterFormTitle>Sign Up</RegisterFormTitle>

        <RegisterFormItem>
          <RegisterFormLabel for="username">Username</RegisterFormLabel>
          <RegisterFormItemInput
            name="username"
            type="text"
            value={user.username}
            onChange={onChange}
          ></RegisterFormItemInput>
        </RegisterFormItem>

        <RegisterFormItem>
          <RegisterFormLabel for="email">Email Address</RegisterFormLabel>
          <RegisterFormItemInput
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
          ></RegisterFormItemInput>
        </RegisterFormItem>

        <RegisterFormItem>
          <RegisterFormLabel for="password">Password</RegisterFormLabel>
          <RegisterFormItemInput
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
          ></RegisterFormItemInput>
        </RegisterFormItem>

        <RegisterFormItem>
          <RegisterFormLabel for="password2">
            Confirm Password
          </RegisterFormLabel>
          <RegisterFormItemInput
            name="password2"
            type="password"
            value={user.password2}
            onChange={onChange}
          ></RegisterFormItemInput>
        </RegisterFormItem>
        <RegisterFormSubmit type="submit" value="Register"></RegisterFormSubmit>
      </RegisterForm>
    </RegisterStyle>
  );
};

const RegisterStyle = styled.div`
  max-width: 1200px;
  margin: 10rem auto;
  background-color: var(--dark-color);
  color: var(--font-color-white);
  border-top: 5px solid var(--primary-color);
  padding: 2rem;
`;

const RegisterForm = styled.form`
  display: grid;
  gap: 2rem;
`;

const RegisterFormTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid var(--font-color-white);
  padding-bottom: 1rem;
`;

const RegisterFormItem = styled.div`
  display: grid;
`;

const RegisterFormItemInput = styled.input`
  background-color: var(--bg-color);
  height: 3.5rem;
  border-radius: 0.5rem;
  padding: 0px 1rem;
  border-style: none;
  font-weight: 500;
  color: var(--font-color-white);
  outline: none;
`;

const RegisterFormLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
`;

const RegisterFormSubmit = styled.input`
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
export default Register;
