import React, { FunctionComponent } from "react";
import { Button, Typography } from "antd";

import { UserPost } from "../../../types";

const { Title, Paragraph } = Typography;

interface PostProps {
  post: UserPost;
  onEditClick: (post: UserPost) => void;
  onDeleteClick: (post: UserPost) => void;
}

export const Post: FunctionComponent<PostProps> = ({ post, onEditClick, onDeleteClick }) => {
  return (
    <div className="my-4 border-b last:border-b-0">
      <Title level={5}>{post.title}</Title>
      <Paragraph>{post.body}</Paragraph>
      <div className="flex justify-end mb-4">
        <div className="mr-2">
          <Button onClick={() => onEditClick(post)}>Edit</Button>
        </div>
        <Button danger onClick={() => onDeleteClick(post)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
