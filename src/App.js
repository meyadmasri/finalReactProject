import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import NavSide from "./componants/NavSide/NavSide";
import SignOut from "./Pages/SignOut/SignOut";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signout" element={<SignOut />}></Route>
      <Route path="/nav" element={<NavSide />}></Route>
    </Routes>
  );
}

export default App;
