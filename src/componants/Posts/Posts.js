import { useState,useRef } from "react";
import "../../assets/posts.css";
import SinglePost from "./SinglePost";


export const Posts = ({posts: allPosts, setPosts, getpost}) => {
  const [page,setPage]= useState(0)
  const [addPost,setAddPost] = useState([])
  const listInnerRef = useRef()
  const [ isLoding,setIsLoding ]=useState(false)
  const onscroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight + 50 > scrollHeight &&
        !isLoding &&
        allPosts.last_page > page
      ) {
        getpost(page + 1);
        setPage (page + 1)
        setIsLoding(true);
      } /* else if ( allPosts.last_page === page && !isLoding) setIsFinish(true); */
    }
  };
  
  return (
    <div /* style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
    }}
    onScroll={onscroll}
    ref={listInnerRef} */>
      {allPosts.map((post) => (<SinglePost post={post} posts={allPosts} setPosts={setPosts}/>))}
    </div>
  );
};

export default Posts;
