import React, { useState, useEffect } from "react";
import { NavBar } from "../NavBar";
import classNames from "classnames";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={cx(styles.dropdown)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const Post = (props) => {
  return (
    <div className={cx(styles.post_body)}>
      <div className={cx(styles.post_header)}>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>{props.user}</p>
          <p>{props.location}</p>
        </div>
      </div>
      <div className={cx(styles.post_content)}>
        <p>{props.content}</p>
      </div>

      <div className={cx(styles.post_info)}>
        <div className={cx(styles.post_caption)}>
          <span>
            <b>{props.user}</b>&nbsp;&nbsp;
          </span>
          <span>{props.caption}</span>
        </div>
        <div>
          <p className={cx(styles.post_comments)}>
            View all {props.comments.length} comments
          </p>
        </div>
        <div>
          <p className={cx(styles.first_comment)}>{props.comments[0]}</p>
        </div>
      </div>
    </div>
  );
};

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
