import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

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

export default Post;
