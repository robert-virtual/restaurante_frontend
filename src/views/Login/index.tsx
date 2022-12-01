import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  useSigninMutation } from "@store/Services/Security";
import {  setSecurityData } from "@store/Slices/securitySlice";

import LoginUX from "./LoginUx";
const Login = () => {
  const [signin, { isLoading, status, error, ...mutRest }] = useSigninMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const  data = await signin({ email, password }).unwrap();
    console.log(data);
    dispatch(setSecurityData(data));
    Navigator("/home");
  }
  return (
    <LoginUX
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleClick={handleClick}
      error={error}
    />
  );
}

export default Login;
