import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogin } from "../Slice/AuthenticationSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();

  dispatch(userLogin(false));

  return <Navigate replace to="/"></Navigate>;
};

export { LogoutPage };
