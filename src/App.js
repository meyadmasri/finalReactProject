import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import SignOut from "./Pages/SignOut/SignOut";
import HomePage from "./Pages/HomePage/HomePage";
import Wrapper from "./componants/Wrapper/Wrapper";
import Profile  from "./Pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signout" element={<SignOut />}></Route>
      <Route
        path="/"
        element={
          <Wrapper>
            <HomePage />
          </Wrapper>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <Wrapper>
            <Profile />
          </Wrapper>
        }
      ></Route>
    </Routes>
  );
}

export default App;
