import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@store/Services/Security";

import SignUp from "./SignUp";
const Login = () => {
  const [signin, { isLoading, status, error, ...mutRest }] = useSignupMutation();
  const Navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const  data = await signin({ email, password }).unwrap();
    console.log(data);
    Navigator("/login");
  }
  return (
    <SignUp
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
