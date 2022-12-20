import "../../assets/posts.css";
import axios from "axios";
import * as dayjs from "dayjs";
import { AuthContext } from "../../contexts/AuthContext";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { useState, useContext } from "react";
import Comments from "./Comments";
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function SinglePost({ post, setPosts, posts }) {
  const { token, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [postsDetails, setPostsDetalis] = useState([]);
  const [newComment, setNewComment] = useState("");

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
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  };
  const liked = async (postsDetails) => {
    axios({
      method: "post",
      url: `https://ferasjobeir.com/api/posts/${
        post.liked_by_current_user ? "unlike" : "like"
      }`,
      data: { post_id: postsDetails.id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const newPosts = [...posts];
        const i = newPosts.findIndex((item) => item.id == res.data.data.id);
        newPosts[i] = res.data.data;
        setPosts(newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addComment = async () => {
    axios({
      method: "post",
      url: `https://ferasjobeir.com/api/comments`,
      data: { post_id: post.id, content: newComment },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const newComment = res.data.data;
        const newPostDetails = [...postsDetails, newComment];
        setPostsDetalis(newPostDetails);
        setNewComment("");
        const newPosts = [...posts];
        const i = newPosts.findIndex((item) => item.id == post.id);
        newPosts[i].comments_count = String(
          parseInt(postsDetails.length) + 1
        );
        setPosts(newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div class="post">
      <div class="postContent">
        <img src={post.user.avatar} alt={post.user.name} />
        <div>
          <div class="mb-0 name">{post.user.name}</div>
          <div class="mb-2 datetime">{dayjs(post.created_at).fromNow()}</div>
          <p>{post.content}</p>
          <div class="icons d-flex align-items-center">
            <div
              class="me-3  py-1 px-2 d-flex align-items-center"
              onClick={() => liked(post)}
            >
              {post.liked_by_current_user ? (
                <Favorite sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorder />
              )}

              <div class="ms-2 fw-bolder">{post.likes_count}</div>
            </div>
            <div
              class="py-1 px-2 d-flex align-items-center"
              onClick={() =>
                !open ? getPostsDetails(post.id) : setOpen(false)
              }
            >
              <ChatBubbleOutline />
              <div class="ms-2 fw-bolder">{post.comments_count}</div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div class="comments m-4">
          {postsDetails.map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
          <div class="container-fluid addcomment">
            <div class="row">
              <div class="col-9 ps-0">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Add a new comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
              </div>
              <div class="col-3 p-0">
                <button
                  class="btn btn-primary w-100"
                  onClick={() => addComment(newComment)}
                >
                  <small>Add</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
