import "../../assets/profile.css";
import { AccountCircle, AllInbox } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [myProfile, setMyProfile] = useState({});
  const [myProfilePost, setMyProfilePost] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (data) => {
    axios({
      method: "get",
      url: "https://ferasjobeir.com/api/users/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMyProfile(res.data.data);
        setMyProfilePost(res.data.data.posts)        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = async (deleteItem) => {
    axios({
      method: "delete",
      url: `https://ferasjobeir.com/api/posts/${deleteItem}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
          const newMyPosts = [...myProfilePost]
          const index = newMyPosts.findIndex(item => item.id == deleteItem)
          newMyPosts.splice(index, 1)
          setMyProfilePost(newMyPosts)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="header-page d-flex py-2 px-3 justify-content-between align-items-center">
        <h4>Profile</h4>
      </div>
      <form>
        <div className="p-3 mb-4 bottom-border ">
          <div className="alert alert-dark ">
            <AccountCircle fontSize="large" /> My Information
          </div>
          <div class="form-field mb-3 person-avatar">
            <label for="avatar" class="mx-auto my-2 d-block w-25">
              <img
                src={myProfile.avatar}
                className="d-block mx-auto rounded-circle w-100"
              />
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFF"
                    d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
                  ></path>
                </svg>
              </div>
            </label>
            <input
              name="avatar"
              type="file"
              id="avatar"
              className="position-absolute"
            />
          </div>
          <div class="form-field mb-3">
            <label for="name" className="mb-2">
              <small>
                Name <span className="text-danger">*</span>
              </small>
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="form-control"
              value={myProfile.name}
            />
          </div>
          <div class="form-field mb-3">
            <label for="email" clasName="mb-2">
              <small>
                Email Address <span class="text-danger">*</span>
              </small>
            </label>
            <input
              name="email"
              type="email"
              id="email"
              class="form-control"
              value={myProfile.email}
            />
          </div>
          <div class="form-field mb-3">
            <label for="password" class="mb-2">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="form-control"
            />
          </div>
          <div className="form-field mb-3">
            <label for="new_password" class="mb-2">
              <small>New Password</small>
            </label>
            <input
              name="new_password"
              type="password"
              id="new_password"
              className="form-control"
            />
          </div>
          <div className="form-field mb-3">
            <label for="password_confirmation" class="mb-2">
              <small>New Password Confirmation</small>
            </label>
            <input
              name="new_password_confirmation"
              type="password"
              id="password_confirmation"
              className="form-control"
            />
          </div>
          <div className="form-field mb-3">
            <button type="submit" class="btn btn-primary">
              Update Profile
            </button>
          </div>
        </div>
      </form>
      <div className="mb-4 p-3">
        <div class="alert alert-dark">
          <AllInbox fontSize="large" /> My Posts
        </div>
        <ul className="list-group">
          {myProfilePost?.map((item) => (
            <li id ={item.id} className="list-group-item d-flex  align-items-center justify-content-between">
              <span>{item.content}</span>
              <span>
                <button class="btn btn-danger btn-sm" onClick={()=> {
                  deletePost(item.id)
                }}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
