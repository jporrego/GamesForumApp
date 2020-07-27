import React from "react";
import styled, { css } from "styled-components";

const Register = () => {
  return (
    <RegisterStyle>
      <RegisterForm>
        <RegisterFormTitle>Sign Up</RegisterFormTitle>

        <RegisterFormItem>
          <RegisterFormLabel for="username">Username</RegisterFormLabel>
          <RegisterFormItemInput
            name="username"
            type="text"
          ></RegisterFormItemInput>
        </RegisterFormItem>

        <RegisterFormItem>
          <RegisterFormLabel for="password">Password</RegisterFormLabel>
          <RegisterFormItemInput
            name="password"
            type="password"
          ></RegisterFormItemInput>
        </RegisterFormItem>

        <RegisterFormItem>
          <RegisterFormLabel for="email">Email Address</RegisterFormLabel>
          <RegisterFormItemInput
            name="email"
            type="email"
          ></RegisterFormItemInput>
        </RegisterFormItem>
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
`;

const RegisterFormLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
`;
export default Register;
