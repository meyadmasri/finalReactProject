import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import SignIn from "../SignIn/SignIn";

const SignOut = () => {
  const switcher = useNavigate();
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
    switcher('/signin')
  }, []);

  return <SignIn/>
};
export default SignOut;
