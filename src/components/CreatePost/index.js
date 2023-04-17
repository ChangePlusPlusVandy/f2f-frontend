import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { AuthInputBlock } from "../AuthInputBlock";

const cx = classNames.bind(styles);

export function CreatePost(props) {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch(process.env.REACT_APP_HOST_URL + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: localStorage.getItem("firstName"),
        title: postTitle,
        body: postContent,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create post");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        // update posts
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
    props.setCreatePost(false);
    props.rotate(false);
  };

  return (
    <div className={cx(styles.content)}>
      <div className={cx(styles.popup)}>
        <h1 className={cx(styles.title)}>Create a Post</h1>
        <form>
          <div className={cx(styles.title_container)}>
            <AuthInputBlock
              label="Post Title"
              value={postTitle}
              onChange={(value) => setPostTitle(value)}
            />
          </div>

          <div>
            <label htmlFor="post" className={cx(styles.desc)}>
              Post Content:
            </label>
          </div>
          <div>
            <textarea
              className={cx(styles.input)}
              type="text"
              id="post"
              placeholder="Enter your text"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
          <div className={cx(styles.submit_wrapper)}>
            <button
              className={cx(styles.submit)}
              onClick={handleSubmit}
              disabled={isLoading}>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}