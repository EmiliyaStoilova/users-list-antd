import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";

import { User } from "../../../types";
import { UserInformation } from "../../../../components";

interface UserInfoProps {
  user: User;
  setShowEditUserDatModal?: (user: User | null) => void;
  isPostsPage?: boolean;
}

export const UserInfo: FunctionComponent<UserInfoProps> = ({ user, setShowEditUserDatModal, isPostsPage }) => {
  const navigate = useNavigate();
  const { id } = user;

  return (
    <div>
      <UserInformation user={user} />

      <Row justify="end">
        <Col span={3}>
          <Button block onClick={() => setShowEditUserDatModal && setShowEditUserDatModal(user)}>
            Edit
          </Button>
        </Col>
        {!isPostsPage && (
          <Col span={3}>
            <Button type="link" block onClick={() => navigate(`${id}`)}>
              See posts
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};
