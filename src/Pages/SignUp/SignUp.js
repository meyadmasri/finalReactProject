import "../../assets/sign-up-in.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const switcher = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleOnChange = (e) => {
    userData[e.target.id] = e.target.value;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await postAccount(userData);
     switcher("/signin")
  };

  const postAccount = async (data) => {
    axios({
      method: "post",
      url: "http://www.ferasjobeir.com/api/users/register",
      data: data,
    })
      .then( (res)=> {
        console.log(res);
      })
      .catch((error)=> {
        console.log(error);
      });
  };

  return (
    <div className="form-cart col-12 ">
      <img className="logo"
        alt="logo"
        src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
      />

      <form className="p-4" onSubmit={handleSubmit}>
        <h1 className="col-12">create account</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            onChange={handleOnChange}
          />
          <div id="nameHelp" className="form-text">
            Enter your full name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
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
          <label htmlFor="Password" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="Password Confirmation" className="form-label">
            Password Confirmation:
          </label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            onChange={handleOnChange}
          />
          <div id="pass1Help" className="form-text">
            Type your Password again.
          </div>
        </div>
        <div className="d-flex justify-content-between my-4 ">
          <button onClick={() => switcher("/signin")} className="btn btn-link">
            Login
          </button>
          <button type="submit" className="btn btn-primary w-50 ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
