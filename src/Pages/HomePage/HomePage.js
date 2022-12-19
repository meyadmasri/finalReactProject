import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../../assets/home.css";
import Head from "../../componants/Head/Head";
import Posts from "../../componants/Posts/Posts";
import { AuthContext } from "../../contexts/AuthContext";

function HomePage() {
  const { token, user } = useContext(AuthContext);
  useEffect(() => {
    getPosts();
  }, []);
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const getPosts = async (id) => {
    axios({
      method: "get",
      url: `https://ferasjobeir.com/api/posts?page=${id}`,
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
      data :{content: newPost},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setAllPosts([res.data.data, ...allPosts]);
        setNewPost("");
        alert(res.data.messages);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.messages);
      });
  };

  return (
    <div>
      <Head
      page_name ="Home"
      />
      <div className=" d-flex py-2 px-3 create-post">
        <img className="me-3 avatar" src={user.avatar} alt={user.name} />
        <div class="textarea d-flex flex-column align-items-end">
          <textarea
            placeholder="What is happening?"
            onChange={(e) =>
              setNewPost(
                e.target.value,
              )
            }
            value={newPost}
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
        <Posts posts={allPosts} setPosts={setAllPosts} getpost ={getPosts}/>
      </div>
    </div>
  );
}

export default HomePage;
