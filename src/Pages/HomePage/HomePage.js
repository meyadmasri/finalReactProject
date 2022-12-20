import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../../assets/home.css";
import Head from "../../componants/Head/Head";
import Loading from "../../componants/Loading/Loading";
import Posts from "../../componants/Posts/Posts";
import { AuthContext } from "../../contexts/AuthContext";

function HomePage() {
  const { token, user } = useContext(AuthContext);
  const [postDe,setPostDe] = useState([])
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [pageNumber, setPageNumber] = useState(1)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getPosts(pageNumber);
  }, [pageNumber]);

    useEffect(() => { 
        window.addEventListener("scroll", () => handleOnScroll()) 
      return () => { 
        if (typeof window !== 'undefined')
        window.removeEventListener("scroll", () => handleOnScroll())
      }
      
    },[document.documentElement.clientHeight + document.documentElement.scrollTop])
    
    const handleOnScroll = () => {
        let userScrollH = document.documentElement.clientHeight + document.documentElement.scrollTop  + 1 
        let windowBottomHeight = document.documentElement.offsetHeight
        if (userScrollH >= windowBottomHeight) {
         
                setPageNumber(pageNumber + 1)
                if(pageNumber >= postDe.last_page ) {
                  setLoading(true)
                }
               
            
      }
    }
    console.log(postDe)

  const getPosts = async (id) => {
   if ( !loading ){ axios({
      method: "get",
      url: `https://ferasjobeir.com/api/posts?page=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setAllPosts([ ...allPosts,...res.data.data.data]);
        setPostDe(res.data.data)
        

      })
      .catch((error) => {
      });
  };}

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
        {!loading && <Loading/>}
      </div>
    </div>
  );
}

export default HomePage;
