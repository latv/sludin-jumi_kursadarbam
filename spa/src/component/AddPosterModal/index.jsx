import { Layout,Modal,Button,message,Row,Col,Form,Input,Upload } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import FormatValidator from '../../utils/validator.js'
import {UploadOutlined, LockOutlined } from '@ant-design/icons';
import APIClient from '../../utils/apiClient';


export default function AddPosterModal({isAddPosterModalVisible , setIsAddPosterModalVisible}) {
    const [loading, setLoading] = useState(false);
    const [addPriceAmount, setAddPriceAmount] = useState("");
    const [inputError, setInputError] = useState(null);


    const onFinish = async (values) => {
        try {
          setLoading(true);
          let response = await APIClient.request(
            '/api/test/register-poster',
            {image: values.image, poster: values.poster, price : addPriceAmount},
            'POST'
          );

          setLoading(false);
          setIsAddPosterModalVisible(false);
          message.info("Esi pievienojis sludinājumu");

        } catch (err) {
          message.error("Neizdevās pievienot sludinājumu");
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
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
            
        
                  >
                    <Upload name="file" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
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

                  <Form.Item>
                    <Button loading={loading} block type="primary" htmlType="submit" className="login-form-button">
                      Log in
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
