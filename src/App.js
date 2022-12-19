import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import SignOut from "./Pages/SignOut/SignOut";
import HomePage from "./Pages/HomePage/HomePage";
import Wrapper from "./componants/Wrapper/Wrapper";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      {!token && (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="*" element={<SignIn />}></Route>
        </Routes>
      )}
      {token && (
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
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
      )}
    </>
  );
}

export default App;
