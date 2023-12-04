import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Row, Col, Button } from "antd";

import { User } from "../../../types";

const { Title, Paragraph, Link } = Typography;

interface UserInfoProps {
  user: User;
  setShowEditUserDatModal: (user: User | null) => void;
}

export const UserInfo: FunctionComponent<UserInfoProps> = ({ user, setShowEditUserDatModal }) => {
  const navigate = useNavigate();
  const { id, email, username, phone, address, website, company } = user;

  return (
    <div>
      <Row justify="space-around" align="top">
        <Col span={7}>
          <Title level={4}>Data</Title>
          <Paragraph>{email}</Paragraph>
          <Paragraph>{username}</Paragraph>
          <Paragraph>{phone}</Paragraph>
          <Link href={website} target="_blank">
            {website}
          </Link>
        </Col>
        <Col span={7}>
          <Title level={4}>Address</Title>
          <Paragraph>{address.city}</Paragraph>
          <Paragraph>{address.zipcode}</Paragraph>
          <Paragraph>
            {address.street}, {address.suite}
          </Paragraph>
        </Col>
        <Col span={7}>
          <Title level={4}>Company</Title>
          <Paragraph>{company.name}</Paragraph>
          <Paragraph>{company.bs}</Paragraph>
          <Paragraph>{company.catchPhrase}</Paragraph>
        </Col>
      </Row>

      <Row justify="end">
        <Col span={3}>
          <Button block onClick={() => setShowEditUserDatModal(user)}>
            Edit
          </Button>
        </Col>
        <Col span={3}>
          <Button type="link" block onClick={() => navigate(`${id}`)}>
            See posts
          </Button>
        </Col>
      </Row>
    </div>
  );
};
