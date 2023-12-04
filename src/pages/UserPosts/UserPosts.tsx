import React, { useState } from "react";
import { useParams } from "react-router";
import { Divider, Empty, List, Typography } from "antd";

import { ErrorMsg, Layout, LoadingOverlay, ShadowedLayout } from "../../components";
import { useGetUserPostsQuery, useGetUserQuery } from "../usersApi";
import { ConfirmationModal, EditPostModal, Post, UserData } from "./components";
import { UserPost } from "../types";
import { useAppSelector } from "../../app/redux/hooks";
import { usersSelector } from "../usersSlice";

const { Title } = Typography;

export const UserPosts = () => {
  const { id } = useParams();

  const { isLoading, isError } = useGetUserPostsQuery(Number(id));
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserQuery(Number(id));
  const { posts } = useAppSelector(usersSelector);

  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState<UserPost | null>(null);
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState<UserPost | null>(null);

  return isLoading || isUserLoading ? (
    <LoadingOverlay />
  ) : (
    <Layout>
      <>
        {isUserError ? <ErrorMsg /> : user ? <UserData user={user} /> : <></>}
        <Divider />
        <ShadowedLayout>
          {isError ? (
            <ErrorMsg />
          ) : posts?.length ? (
            <List
              header={<Title level={4}>Posts</Title>}
              dataSource={posts}
              renderItem={(post) => (
                <Post post={post} onEditClick={setIsEditPostModalOpen} onDeleteClick={setIsDeletePostModalOpen} />
              )}
            />
          ) : (
            <Empty />
          )}
        </ShadowedLayout>
        <EditPostModal open={!!isEditPostModalOpen} setOpen={setIsEditPostModalOpen} post={isEditPostModalOpen} />
        <ConfirmationModal
          open={!!isDeletePostModalOpen}
          setOpen={setIsDeletePostModalOpen}
          post={isDeletePostModalOpen}
        />
      </>
    </Layout>
  );
};
