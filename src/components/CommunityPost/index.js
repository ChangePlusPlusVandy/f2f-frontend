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
          <ProfilePicture image={props.img} />
        </div>
        <div className={cx(styles.post_user)}>
          <p>
            <b>{props.user}</b>
          </p>
          <p>{props.location}</p>
        </div>
      </div>
      <div className={cx(styles.post_content)}>
        <p>{props.content}</p>
      </div>

      <div className={cx(styles.post_info)}>
        <div className={cx(styles.post_caption)}>
          <span>
            <b>{props.user}</b>&nbsp;
          </span>
          <span>{props.caption}</span>
        </div>
        <div>
          <p className={cx(styles.post_comments)}>
            View all {props.comments.length} comments
          </p>
        </div>
        <div>
          <p className={cx(styles.first_comment)}>
            <span>
              <b>{props.comments[0].user}</b>&nbsp;
            </span>
            {props.comments[0].comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
