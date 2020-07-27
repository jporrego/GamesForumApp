import React, { useState } from "react";
import styled, { css } from "styled-components";

const Login = () => {
  return (
    <LoginStyle>
      <LoginForm>
        <LoginFormTitle>Login</LoginFormTitle>

        <LoginFormItem>
          <LoginFormLabel for="email">Email Address</LoginFormLabel>
          <LoginFormItemInput name="email" type="email"></LoginFormItemInput>
        </LoginFormItem>

        <LoginFormItem>
          <LoginFormLabel for="password">Password</LoginFormLabel>
          <LoginFormItemInput
            name="password"
            type="password"
          ></LoginFormItemInput>
        </LoginFormItem>
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
export default Login;
