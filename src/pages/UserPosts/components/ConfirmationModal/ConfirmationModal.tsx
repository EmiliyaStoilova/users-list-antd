import React, { FunctionComponent, useEffect } from "react";
import { Alert, Button, Divider, Modal, Space, Typography } from "antd";

import { UserPost } from "../../../types";
import { useDeletePostMutation } from "../../../usersApi";

const { Title, Paragraph } = Typography;

interface ConfirmationModalProps {
  open: boolean;
  setOpen: (post: UserPost | null) => void;
  post: UserPost | null;
}

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({ open, setOpen, post }) => {
  const [deletePost, { isLoading, isError, isSuccess }] = useDeletePostMutation();

  const handleDelete = async () => {
    if (post) {
      await deletePost(post?.id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(null);
    }
  }, [isSuccess]);

  return (
    <Modal open={open} onCancel={() => setOpen(null)} footer={() => <></>}>
      <Title level={3}>Are you sure?</Title>
      {isError && <Alert message="Something went wrong! Please try again later." type="error" />}
      <Divider />
      <Paragraph>
        Are you sure you want to delete <strong>{post?.title}</strong>? You CAN NOT view this post in your list anymore
        if you delete.
      </Paragraph>
      <Divider />
      <Space size="middle" style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setOpen(null)} loading={isLoading}>
          Cancel
        </Button>
        <Button danger onClick={handleDelete} loading={isLoading}>
          Delete
        </Button>
      </Space>
    </Modal>
  );
};
