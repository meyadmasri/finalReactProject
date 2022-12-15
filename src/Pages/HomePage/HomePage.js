import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../../assets/home.css";
import Posts from "../../componants/Posts/Posts";
import { AuthContext } from "../../contexts/AuthContext";

function HomePage() {
  const { token, user } = useContext(AuthContext);
  useEffect(() => {
    getPosts();
  }, []);
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
  });

  const getPosts = async (data) => {
    axios({
      method: "get",
      url: "https://ferasjobeir.com/api/posts?page=1",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setAllPosts(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateNewPost = async (data) => {
    axios({
      method: "post",
      url: "https://ferasjobeir.com/api/posts",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        alert(res.data.messages);
        setAllPosts([res.data.data, ...allPosts]);
        setNewPost({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.messages);
      });
  };

  return (
    <div>
      <div className="header-page d-flex py-2 px-3 justify-content-between align-items-center">
        <h4>Home</h4>
      </div>
      <div className=" d-flex py-2 px-3 create-post">
        <img className="me-3 avatar" src={user.avatar} alt={user.name} />
        <div class="textarea d-flex flex-column align-items-end">
          <textarea
            placeholder="What is happening?"
            onChange={(e) =>
              setNewPost({
                content: e.target.value,
              })
            }
          ></textarea>
          <button
            class="btn btn-primary"
            onClick={() => CreateNewPost(newPost)}
          >
            Create Post
          </button>
        </div>
      </div>

      <div>
        <Posts posts={allPosts} />
      </div>
    </div>
  );
}

export default HomePage;
