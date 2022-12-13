import "../../assets/sign-up-in.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const SignIn = () => {
  const { logIn } = useContext(AuthContext);
  const switcher = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    userData[e.target.id] = e.target.value;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await postAccount(userData);
    
  };

  const postAccount = async (data) => {
    axios({
      method: "post",
      url: "https://ferasjobeir.com/api/users/login",
      data: data,
    })
      .then((res) => {
        console.log(res);
        logIn(res.data.data, res.data.token);
        switcher('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="all">
      <div className="form-cart col-12">
        <img className="logo"
          alt="logo"
          src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
        />

        <form className="p-4" onSubmit={handleSubmit}>
          <h1 className="col-12">Login</h1>

          <div className="mb-3">
            <label for="Email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="Password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleOnChange}
            />
            <div id="passHelp" className="form-text">
              Type your Password.
            </div>
          </div>
          <div className="d-flex justify-content-between my-4 ">
            <button
              onClick={() => switcher("/signup")}
              className="btn btn-link"
            >
              Register
            </button>
            <button type="submit" className="btn btn-primary w-50 ">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
