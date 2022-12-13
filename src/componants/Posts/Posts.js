import "../../assets/posts.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import * as dayjs from "dayjs";
import { AuthContext } from "../../contexts/AuthContext";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";

export const Posts = () => {
  let relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const { token } = useContext(AuthContext);
  useEffect(() => {
    getPosts();
  }, []);
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async (data) => {
    axios({
      method: "get",
      url: "https://ferasjobeir.com/api/posts?page=1",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setAllPosts(res.data.data.data);
        console.log(allPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [postsDetails, setPostsDetalis] = useState([]);
  const getPostsDetails = async (i) => {
    axios({
      method: "get",
      url: `https://ferasjobeir.com/api/posts/${i}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPostsDetalis(res.data.data.comments);
        console.log(res);
        console.log(postsDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {allPosts.map((post) => {
        return (
          <div class="post">
            <div class="postContent">
              <img src={post.user.avatar} alt={post.user.name} />
              <div>
                <div class="mb-0 name">{post.user.name}</div>
                <div class="mb-2 datetime">{dayjs(post.created_at).fromNow()}</div>
                <p>{post.content}</p>
                <div class="icons d-flex align-items-center">
                  <div class="me-3  py-1 px-2 d-flex align-items-center">
                    <FavoriteBorder />
                    <div class="ms-2 fw-bolder">{post.likes_count}</div>
                  </div>
                  <div
                    class="py-1 px-2 d-flex align-items-center"
                    onClick={() => getPostsDetails(post.id)}
                  >
                    <ChatBubbleOutline />
                    <div class="ms-2 fw-bolder">{post.comments_count}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comments">
              {postsDetails.map((comment) => {
                return (
                  <div class="comment" key={comment.id}>
                    <img src={comment.user.avatar} alt={comment.user.name} />
                    <div>
                      <div class="name">{comment.user.name}</div>
                      <div class="mb-2 datetime">{dayjs(comment.created_at).fromNow()}</div>
                      {comment.content}
                    </div>
                  </div>
                );
              })}

              <div class="container-fluid addcomment">
                <div class="row">
                  <div class="col-9 ps-0">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add a new comment"
                    />
                  </div>
                  <div class="col-3 p-0">
                    <button class="btn btn-primary w-100">
                      <small>Add</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
