import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import LoginForm from "../components/formLogin/FormLogin";
import "./style.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const logeed = useAppSelector((state) => state.LogUser);
  const jumpPage = () => {
    if (logeed.status === true) {
      navigate("/messages");
    }
  };

  useEffect(() => {
    setTimeout(jumpPage, 1000);
  }, []);

  return <LoginForm></LoginForm>;
};

export default Login;
