import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import FormCreate from "../components/formCreate/FormCreate";

const CreatAccount: React.FC = () => {
  const navigate = useNavigate();
  const logeed = useAppSelector((state) => state.LogUser);

  useEffect(() => {
    if (logeed.status !== false) {
      navigate("/Messages");
    }
  }, []);

  return <FormCreate></FormCreate>;
};

export default CreatAccount;
