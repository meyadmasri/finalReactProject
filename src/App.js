import "./App.css";
import { Route, Routes } from "react-router-dom";
import Wrapper from "./componants/Wrapper/Wrapper";
import { AuthContext } from "./contexts/AuthContext";
import React,{ useContext,Suspense } from "react";
import Loading from "./componants/Loading/Loading";
const Signin = React.lazy(()=> import('./Pages/SignIn/SignIn'))
const Signup = React.lazy(()=> import('./Pages/SignUp/SignUp'))
const Signout = React.lazy(()=> import('./Pages/SignOut/SignOut'))
const Notfound = React.lazy(()=> import('./Pages/NotFound/NotFound'))
const Profile = React.lazy(()=> import('./Pages/Profile/Profile'))
const Home = React.lazy(()=> import('./Pages/HomePage/HomePage'))



function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      {!token && (
        <Routes>
          <Route path="/signin" element={<Suspense fallback={<Loading/>}><Signin /></Suspense>}></Route>
          <Route path="/signup" element={<Suspense fallback={<Loading/>}><Signup /></Suspense>}></Route>
          <Route path="*" element={<Suspense fallback={<Loading/>}><Signin /></Suspense>}></Route>
        </Routes>
      )}
      {token && (
        <Routes>
          <Route path="*" element={<Suspense fallback={<Loading/>}><Notfound /></Suspense>}></Route>
          <Route path="/signout" element={<Suspense fallback={<Loading/>}><Signout /></Suspense>}></Route>
          <Route
            path="/"
            element={
              <Wrapper>
                <Suspense fallback={<Loading/>}><Home /></Suspense>
              </Wrapper>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Wrapper>
                <Suspense fallback={<Loading/>}><Profile /></Suspense>
              </Wrapper>
            }
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
