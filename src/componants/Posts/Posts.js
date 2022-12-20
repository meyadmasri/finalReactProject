import { useState,useRef } from "react";
import "../../assets/posts.css";
import SinglePost from "./SinglePost";


export const Posts = ({posts: allPosts, setPosts, getpost}) => {

  
  
  return (
    <div>
      {allPosts.map((post) => (<SinglePost post={post} posts={allPosts} setPosts={setPosts}/>))}
    </div>
  );
};

export default Posts;
