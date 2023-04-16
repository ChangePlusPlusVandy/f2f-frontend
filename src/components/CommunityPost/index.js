import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";
import ProfilePicture from "../ProfilePicture";

const cx = classNames.bind(styles);

const Post = (props) => {
  return (
    <div className={cx(styles.post_body)}>
      <div className={cx(styles.post_header)}>
        <div className={cx(styles.post_pfp)}>
          <ProfilePicture />
        </div>
        <div className={cx(styles.post_user)}>
          <p>
            <b>{props.name}</b>
          </p>
          <span>{props.heading}</span>
        </div>
      </div>
      <div className={cx(styles.post_content)}>
        <p>{props.body}</p>
      </div>

      {/* <div className={cx(styles.post_info)}>
        <div className={cx(styles.post_caption)}>
          <span>
            <b>{props.name}</b>&nbsp;
          </span>
        </div>
        <div>
          <p className={cx(styles.first_comment)}>
            <span>
              <b>{props.comments}</b>&nbsp;
            </span>
            {props.comments}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Post;
