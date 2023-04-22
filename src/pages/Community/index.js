import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { BackArrow } from "../../components/BackArrow";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";
import { TIMEOUT } from "../../lib/constants";
// component imports
import Dropdown from "../../components/CommunityHeader";
import Post from "../../components/CommunityPost";
//image imports
import PFP from "../../images/PFP.png";
import PlusSign from "../../images/PlusSign.png";
import { CreatePost } from "../../components/CreatePost";
const cx = classNames.bind(styles);
export const Community = () => {
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    fetch(process.env.REACT_APP_HOST_URL + "/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  };
  const [posts, setPosts] = useState([]);
  const [options, setOptions] = useState(["All Disabilities"]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [timer, setTimer] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setTimer(
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, TIMEOUT)
    );
  }, []);
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);
  const createPost = () => {
    setShowCreatePost(!showCreatePost);
    setRotate(!rotate);
  };
  return (
    <div
      className={cx(styles.content)}
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "92vh",
      }}>
      <header className={cx(styles.header)}>
        <Dropdown options={options} />
      </header>
      {showCreatePost && (
        <CreatePost setCreatePost={setShowCreatePost} rotate={setRotate} />
      )}
      <div className={cx(styles.posts)}>
        {posts.reverse().map((post) => {
          return (
            <Post
              name={post.name}
              heading={post.title}
              body={post.body}
              comments={post.comments}
            />
          );
        })}
      </div>
      <div
        className={
          rotate ? cx(styles.create_post_rotate) : cx(styles.create_post)
        }
        onClick={() => {
          createPost();
        }}>
        <img src={PlusSign} alt="" />
      </div>
      <NavBar />
    </div>
  );
};