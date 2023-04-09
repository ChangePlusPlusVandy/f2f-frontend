import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { BackArrow } from "../../components/BackArrow";
import { NavBar } from "../NavBar";
import { CreatePost } from "../../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { TIMEOUT } from "../../lib/constants";

// component imports
import Dropdown from "../../components/CommunityHeader";
import Post from "../../components/CommunityPost";

//image imports
import PFP from "../../images/PFP.png";
import PlusSign from "../../images/PlusSign.png";

const cx = classNames.bind(styles);

export const Community = () => {
  const [posts, setPosts] = useState([
    {
      user: "blah",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
    {
      user: "blah2",
      location: "nash",
      img: PFP,
      content: "lorem",
      caption: "lorem",
      comments: [
        { user: "user1", comment: "good comment" },
        { user: "user2", comment: "okay comment" },
      ],
    },
  ]);
  const [options, setOptions] = useState([
    "All Disabilities",
    "ADHD",
    "Autism",
  ]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [timer, setTimer] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/community")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.options);
        setPosts(data.posts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userID");
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
      <div className={cx(styles.posts)}>
        {posts.map((post) => {
          return (
            <Post
              user={post.user}
              location={post.location}
              img={post.img}
              content={post.content}
              caption={post.caption}
              comments={post.comments}
            />
          );
        })}
      </div>
      <div className={cx(styles.create_post)} onClick={createPost}>
        <img src={PlusSign} alt="" />
      </div>
      {showCreatePost && <CreatePost />}
      <NavBar />
    </div>
  );
};
