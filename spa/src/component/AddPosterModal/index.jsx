import { Layout,Modal,Button,message,Row,Col,Form,Input,Upload } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import FormatValidator from '../../utils/validator.js'
import {UploadOutlined, LockOutlined } from '@ant-design/icons';
// import APIClient from '../../utils/apiClient';
import jwt from '../../utils/jwt';


import axios from 'axios';


export default function AddPosterModal({isAddPosterModalVisible , setIsAddPosterModalVisible}) {
    const [loading, setLoading] = useState(false);
    const [addPriceAmount, setAddPriceAmount] = useState("");
    const [inputError, setInputError] = useState(null);
    const [addPicture, setAddPicture]= useState();


    const onFinish = async (values) => {
        try {
          setLoading(true);
          let data = new FormData();
          data.append("x-access-token",jwt.getHeader());
          data.append("image",addPicture);
          data.append("poster",values.poster)
          data.append("price",addPriceAmount);
          axios.post(
            '/api/test/register-poster',
            data
          );

          setLoading(false);
          setIsAddPosterModalVisible(false);
          message.info("Esi pievienojis sludinājumu");

        } catch (err) {
          message.error("Neizdevās pievienot sludinājumu");
          setLoading(false);
          console.log(err);

        }
      };


      
    return (
        <>
        <Modal title="Pievienot sludinājumu" visible={isAddPosterModalVisible} footer={null}  onCancel={() => setIsAddPosterModalVisible(false)}>
              <Row align="middle" justify="center" className="h-100" >
            <Col xs={22} sm={16} md={12} lg={8}>
              <div className="login-card">
         
                <Form
                  enctype="multipart/form-data"
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                    <input type="file" onChange={(e) => {
                      console.log(e.target.files[0]);
                      setAddPicture(e.target.files[0])}} />
                    <Form.Item
                    name="poster"
                    rules={[
                      {
                        required: true,
                        message: 'Lūdzu ievadi sludinājuma saturu!',
                      },
                    ]}
                  >
                    <Input
                      // prefix={<LockOutlined className="site-form-item-icon" />}
                      type="text"
                      placeholder="Ievadi saturu"
                    />
                  </Form.Item>
                 
     
               
                  <Input
        error={inputError}
        placeholder="0.00"
        value={addPriceAmount}
        onChange={(el) => {
          const amount = el.target.value;

          if (FormatValidator.isMoney(amount)) {
            setAddPriceAmount(amount);
            setInputError(null);
          } else {
            setInputError("Vajaga būt ar diviem cipariem aiz decimālkomata");
          }
        }}
      />
      <Form.Item
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: 'Lūdzu ievadi telefona numuru!',
                      },
                    ]}
                  >
                            <Input
                      // prefix={<LockOutlined className="site-form-item-icon" />}
                      type="text"
                      placeholder="Ievadi telefona numuru"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button loading={loading} block type="primary" htmlType="submit" className="login-form-button">
                      Pievienot sludinājumu
                    </Button>
                    
                    
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal>
        </>
    )
}
