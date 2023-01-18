import React, { useState, useEffect } from "react";
import { NavBar } from "../NavBar";
import classNames from "classnames";
import styles from "./index.module.css";
import Dropdown from "../../components/CommunityHeader";
import Post from "../../components/CommunityPost";

const cx = classNames.bind(styles);

export const Community = () => {
  const [posts, setPosts] = useState([
    {
      user: "blah",
      location: "nash",
      content: "lorem",
      caption: "lorem",
      comments: ["good comment", "okay comment"],
    },
    {
      user: "blah2",
      location: "nash",
      content: "lorem",
      caption: "lorem",
      comments: ["good comment", "okay comment"],
    },
  ]);
  const [options, setOptions] = useState(["All Disabilities", "Autism"]);

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

  return (
    <div className={cx(styles.content)}>
      <header className={cx(styles.header)}>
        <Dropdown options={options} />
      </header>
      <div>
        {posts.map((post) => {
          return (
            <Post
              user={post.user}
              location={post.location}
              content={post.content}
              caption={post.caption}
              comments={post.comments}
            />
          );
        })}
      </div>
      <NavBar />
    </div>
  );
};
