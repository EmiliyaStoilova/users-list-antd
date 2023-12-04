import React, { FunctionComponent, useState } from "react";
import { User } from "../../../types";
import { Button, Card } from "antd";
import { EditUserModal, UserInformation } from "../../../../components";

export const UserData: FunctionComponent<{ user: User }> = ({ user }) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  return (
    <>
      <Card
        title={user.name}
        className="shadow-md"
        extra={
          <Button type="link" onClick={() => setIsEditUserModalOpen(true)}>
            Edit
          </Button>
        }
      >
        <UserInformation user={user} />
      </Card>
      <EditUserModal open={isEditUserModalOpen} setOpen={() => setIsEditUserModalOpen(false)} user={user} />
    </>
  );
};
