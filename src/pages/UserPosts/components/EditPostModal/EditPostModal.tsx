import React, { FunctionComponent, useEffect } from "react";
import { Alert, Button, Divider, Input, Modal, Space, Typography } from "antd";
import { Formik, FormikErrors } from "formik";
import _ from "lodash";

import { EditPostProps, UserPost } from "../../../types";
import { ERROR_TYPE } from "../../../../constants";
import { useUpdatePostMutation } from "../../../usersApi";

const { Title } = Typography;

interface EditPostModalProps {
  open: boolean;
  setOpen: (post: UserPost | null) => void;
  post: UserPost | null;
}

export const EditPostModal: FunctionComponent<EditPostModalProps> = ({ open, setOpen, post }) => {
  const [updatePost, { isLoading, isError, isSuccess }] = useUpdatePostMutation();

  const initialValues: EditPostProps = {
    title: post?.title || "",
    body: post?.body || ""
  };

  const validateForm = (values: EditPostProps) => {
    const errors: FormikErrors<EditPostProps> = {};
    if (!values.title) errors.title = ERROR_TYPE.REQUIRED;
    if (!values.body) errors.body = ERROR_TYPE.REQUIRED;

    return errors;
  };

  const handleSubmit = async (values: EditPostProps) => {
    const { title, body } = values;

    await updatePost({
      id: post?.id,
      ...(title !== post?.title && { title }),
      ...(body !== post?.body && { body })
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(null);
    }
  }, [isSuccess]);

  return (
    <Modal open={open} onCancel={() => setOpen(null)} footer={() => <></>}>
      <Title level={3}>Edit post</Title>
      {isError && <Alert message="Something went wrong! Please try again later." type="error" />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm} enableReinitialize>
        {({ values, errors, handleSubmit, handleChange, handleReset }) => (
          <form onSubmit={handleSubmit}>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
              <Input
                name="title"
                status={errors?.title ? "error" : ""}
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
              />
              <Input
                name="body"
                status={errors?.body ? "error" : ""}
                placeholder="Body"
                value={values.body}
                onChange={handleChange}
              />
            </Space>
            <Divider />
            <Space size="middle" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleReset} danger loading={isLoading} disabled={_.isEqual(initialValues, values)}>
                Reset
              </Button>
              <Button htmlType="submit" loading={isLoading} disabled={_.isEqual(initialValues, values)}>
                Save
              </Button>
            </Space>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
