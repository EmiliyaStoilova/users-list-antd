import React, { FunctionComponent } from "react";
import { User } from "../../pages/types";
import { Col, Row, Typography } from "antd";

const { Title, Paragraph, Link } = Typography;

export const UserInformation: FunctionComponent<{ user: User }> = ({ user }) => {
  const { email, username, phone, address, website, company } = user;

  return (
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
  );
};
