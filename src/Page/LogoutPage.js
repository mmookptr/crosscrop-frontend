import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LogoutPage = () => {
  const [cookies, setCookie] = useCookies(["isLogin"]);

  setCookie("isLogin", "false");
  console.log(cookies.isLogin)
  return <Navigate replace to="/"></Navigate>;
};

export { LogoutPage };
