import React, { FunctionComponent, useEffect } from "react";
import { Modal, Typography, Input, Space, Button, Divider, Alert } from "antd";
import { Formik, FormikErrors } from "formik";
import _ from "lodash";

import { EditUserDataValues, User } from "../../../types";
import { ERROR_TYPE, emailRegex } from "../../../../constants";
import { useUpdateUserMutation } from "../../../usersApi";

const { Title } = Typography;

interface EditUserModalProps {
  open: boolean;
  setOpen: (user: User | null) => void;
  user: User | null;
}

export const EditUserModal: FunctionComponent<EditUserModalProps> = ({ open, setOpen, user }) => {
  const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation();

  const initialValues: EditUserDataValues = {
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    street: user?.address.street || "",
    suite: user?.address.suite || "",
    city: user?.address.city || "",
    zipcode: user?.address.zipcode || "",
    phone: user?.phone || "",
    website: user?.website || ""
  };

  const validateForm = (values: EditUserDataValues) => {
    const errors: FormikErrors<EditUserDataValues> = {};
    if (!values.name) errors.name = ERROR_TYPE.REQUIRED;
    if (!values.username) errors.username = ERROR_TYPE.REQUIRED;
    if (!values.email) errors.email = ERROR_TYPE.REQUIRED;
    if (!values.street) errors.street = ERROR_TYPE.REQUIRED;
    if (!values.suite) errors.suite = ERROR_TYPE.REQUIRED;
    if (!values.city) errors.city = ERROR_TYPE.REQUIRED;
    if (!values.zipcode) errors.zipcode = ERROR_TYPE.REQUIRED;
    if (!values.phone) errors.phone = ERROR_TYPE.REQUIRED;
    if (!values.website) errors.website = ERROR_TYPE.REQUIRED;

    if (values.email && !values.email.match(emailRegex)) errors.email = ERROR_TYPE.INVALID_EMAIL;
    return errors;
  };

  const handleSubmit = async (values: EditUserDataValues) => {
    const { name, username, email, phone, website, ...address } = values;

    await updateUser({
      id: user?.id,
      name,
      username,
      email,
      phone,
      website,
      address: { ...address, geo: { ...user!.address.geo } }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(null);
    }
  }, [isSuccess]);

  return (
    <Modal open={open} onCancel={() => setOpen(null)} footer={() => <></>}>
      <Title level={3}>Edit user</Title>
      {isError && <Alert message="Something went wrong! Please try again later." type="error" />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm} enableReinitialize>
        {({ values, errors, handleSubmit, handleChange, handleReset }) => (
          <form onSubmit={handleSubmit}>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
              <Input
                name="name"
                status={errors?.name ? "error" : ""}
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
              />
              <Input
                name="username"
                status={errors?.username ? "error" : ""}
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              <Input
                name="email"
                status={errors?.email ? "error" : ""}
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                status={errors?.phone ? "error" : ""}
                placeholder="Phone"
                value={values.phone}
                onChange={handleChange}
              />
              <Input
                name="street"
                status={errors?.street ? "error" : ""}
                placeholder="Street"
                value={values.street}
                onChange={handleChange}
              />
              <Input
                name="suite"
                status={errors?.suite ? "error" : ""}
                placeholder="Suite"
                value={values.suite}
                onChange={handleChange}
              />
              <Input
                name="city"
                status={errors?.city ? "error" : ""}
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
              <Input
                name="zipcode"
                status={errors?.zipcode ? "error" : ""}
                placeholder="ZIP code"
                value={values.zipcode}
                onChange={handleChange}
              />
              <Input
                name="website"
                status={errors?.website ? "error" : ""}
                placeholder="Website"
                value={values.website}
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
