import React, { useMemo, useState } from "react";
import { Collapse, CollapseProps, Empty, Typography } from "antd";

import { EditUserModal, ErrorMsg, Layout, LoadingOverlay, ShadowedLayout } from "../../components";
import { useGetUsersQuery } from "../usersApi";
import { User } from "../types";
import { useAppSelector } from "../../app/redux/hooks";
import { usersSelector } from "../usersSlice";
import { UserInfo } from "./components";

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
        <ShadowedLayout>
          <>
            <Title level={2}>Users List</Title>
            {isError ? (
              <ErrorMsg />
            ) : users?.length ? (
              <Collapse items={items} expandIconPosition="right" accordion ghost />
            ) : (
              <Empty />
            )}
          </>
        </ShadowedLayout>
        <EditUserModal open={!!selectedUser} setOpen={setSelectedUser} user={selectedUser} />
      </>
    </Layout>
  );
};
