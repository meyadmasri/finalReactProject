import "../../assets/nav-side.css";
import { NavLink } from "react-router-dom";
import {
  Home,
  Mail,
  Person,
  Explore,
  Bookmarks,
  ViewList,
  Lock,
} from "@mui/icons-material";
const NavSide = () => {
  const menu = [
    {
      target: "/",
      text: "home",
      icon: <Home fontSize="medium" />,
    },
    {
      target: "/messages",
      text: "messages",
      icon: <Mail fontSize="medium" />,
    },
    {
      target: "/bookmarks",
      text: "bookmarks",
      icon: <Bookmarks fontSize="medium" />,
    },
    {
      target: "/explore",
      text: "explore",
      icon: <Explore fontSize="medium" />,
    },
    {
      target: "/lists",
      text: "lists",
      icon: <ViewList fontSize="medium" />,
    },
    {
      target: "/profile",
      text: "profile",
      icon: <Person fontSize="medium" />,
    },
    {
      target: "/signout",
      text: "sign out",
      icon: <Lock fontSize="medium" />,
    },
  ];

  return (
    <div className="menu-all col-12 d-flex flex-column gap-3 p-3 m-0">
      <img
        className="px-3 mx-4 mt-0 nav-logo"
        alt="logo"
        src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
      />
      {menu.map((item, i) => {
        return (
          <div className=" mx-4 p-3" key={i}>
            <NavLink className={({isActive})=>(isActive)? "active-link p-3" : "menu-item p-3"} to={item.target}>
              
              {item.icon} &nbsp; {item.text}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
export default NavSide;
