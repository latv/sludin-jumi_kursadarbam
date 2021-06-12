import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import jwt from '../../utils/jwt';
import { SearchOutlined, HeartOutlined, UserOutlined, LogoutOutlined, LockOutlined } from '@ant-design/icons';
import APIClient from '../../utils/apiClient';
import Cookies from 'js-cookie';

export default function LogInModal({isModalVisible,setIsModalVisible,setIsSignedIn}) {
    const [loading, setLoading] = useState(false);



    const onFinish = async (values) => {
        try {
          setLoading(true);
          let response = await APIClient.request(
            '/api/auth/signin',
            {username: values.username, password: values.password},
            'POST'
          );
          jwt.saveToken(response.accessToken, response.expiresIn);
          setLoading(false);
          setIsModalVisible(false);
          message.info("Tu esi ielogojies");
          setIsSignedIn(true);
          // history.replace('/');
        } catch (err) {
          message.error("Lietotājvārds vai parole ir nepareiza!");
          console.log(err);
          setLoading(false);
        }
      };

    return (
        <>
        <Modal title="Ielogošana" visible={isModalVisible} footer={null}  onCancel={() => setIsModalVisible(false)}>
              <Row align="middle" justify="center" className="h-100" >
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Username!',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button loading={loading} block type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                    {/* <NavLink to='/signup'>sign up</NavLink> */}
                    
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal>
        </>
    )
}