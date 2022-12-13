import axios from "axios";
import React, { useContext, useEffect } from "react";
import "../../assets/home.css";
import Posts from "../../componants/Posts/Posts";
import { AuthContext } from "../../contexts/AuthContext";


function HomePage() {
  const {token,user} =useContext(AuthContext)

  const newPost = async (data) => {
    axios({
      method: "post",
      url: "https://ferasjobeir.com/api/posts",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="header-page d-flex py-2 px-3 justify-content-between align-items-center">
        <h4>Home</h4>
      </div>
      <div className=" d-flex py-2 px-3 create-post">
        <img
          className="me-3 avatar"
          src={user.avatar}
          alt={user.name}
        />
        <div class="textarea d-flex flex-column align-items-end">
          <textarea placeholder="What is happening?"></textarea>
          <button class="btn btn-primary">Create Post</button>
        </div>
      </div>

      <div>
        <Posts/>
      </div>
    </div>
  );
}

export default HomePage;
