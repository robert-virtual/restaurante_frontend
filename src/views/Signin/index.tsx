import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/secSlice";

import SigninUX from "./SigninUx";
const Signin = () => {
  const [login, { isLoading, status, error, ...mutRest }] = useSigninMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const data = await login({ email, password }).unwrap();
    console.log({data});
    dispatch(setSecData(data));
    Navigator("/home");
  };
  return (
    <SigninUX
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleClick={handleClick}
      error={error}
    />
  );
};

export default Signin;
