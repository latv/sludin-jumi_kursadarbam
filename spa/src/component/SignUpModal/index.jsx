import { Modal, Button, message, Row, Col, Form, Input } from "antd";
import React, { useState } from "react";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import APIClient from "../../utils/apiClient";

export default function LogInModal({ isModalVisible, setIsModalVisible }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let response = await APIClient.request(
        "/api/auth/signup",
        {
          name: values.name,
          surname: values.surname,
          password: values.password,
          email: values.email,
          phone_number: values.phone_number,
        },
        "POST"
      );

      setLoading(false);
      setIsModalVisible(false);
      message.info("Tu esi piereģistrēts");
    } catch (err) {
      message.error("Lietotājvārds vai parole ir nepareiza!");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Ielogošana"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Row align="middle" justify="center" className="h-100">
          <Col xs={22} sm={16} md={12} lg={8}>
            <div className="login-card">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Lūdzu ievadi savu vārdu!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="vārds"
                  />
                </Form.Item>
                <Form.Item
                  name="surname"
                  rules={[
                    {
                      required: true,
                      message: "Lūdzu ievadi savu uzvārdu!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="uzvārds"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Lūdzu ievadi paroli!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="parole"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Lūdzu ievadi e-pastu!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="e-pasts"
                  />
                </Form.Item>
                <Form.Item
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: "Lūdzu ievadi savu telefona numuru!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Telefons numurs"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={loading}
                    block
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Piereģistrēties
                  </Button>
                  {/* <NavLink to='/signup'>sign up</NavLink> */}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
