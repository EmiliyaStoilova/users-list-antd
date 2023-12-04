import React, { useMemo, useState } from "react";
import { Collapse, CollapseProps, Empty, Typography } from "antd";

import { Layout, LoadingOverlay } from "../../components";
import { useGetUsersQuery } from "../usersApi";
import { EditUserModal, UserInfo } from "./components";
import { User } from "../types";
import { useAppSelector } from "../../app/redux/hooks";
import { usersSelector } from "../usersSlice";

const { Title } = Typography;

export const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { isLoading, isError } = useGetUsersQuery();
  const { users } = useAppSelector(usersSelector);

  const items = useMemo(() => {
    const itemsArr: CollapseProps["items"] = [];

    if (users) {
      users.forEach((user) => {
        itemsArr.push({
          key: user.id,
          label: user.name,
          children: <UserInfo user={user} setShowEditUserDatModal={setSelectedUser} />
        });
      });
    }

    return itemsArr;
  }, [users]);

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <Layout>
      <>
        <div className="shadow-md rounded-md p-4">
          <Title level={2}>Users List</Title>
          {isError ? (
            <Empty
              image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Ferror&psig=AOvVaw1LV7i4rwj4nbpOnfQ2rkXJ&ust=1701785490486000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMizlJD79YIDFQAAAAAdAAAAABAY"
              description={<p>Something went wrong! Please try again later.</p>}
            />
          ) : users?.length ? (
            <Collapse items={items} expandIconPosition="right" accordion ghost />
          ) : (
            <Empty />
          )}
        </div>
        <EditUserModal open={!!selectedUser} setOpen={setSelectedUser} user={selectedUser} />
      </>
    </Layout>
  );
};
