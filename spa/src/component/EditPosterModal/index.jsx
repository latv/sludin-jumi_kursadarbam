import { Layout,Modal,Button,message,Row,Col,Form,Input,AutoComplete } from 'antd';
import React, { useState ,useEffect} from 'react';
import './styles.css';
import FormatValidator from '../../utils/validator.js'
import {UploadOutlined, LockOutlined } from '@ant-design/icons';
import APIClient from '../../utils/apiClient';
import jwt from '../../utils/jwt';


import axios from 'axios';


export default function AddPosterModal({ setupdate, update  ,isEditPosterModalVisible , setIsEditPosterModalVisible,poster}) {

  
    const [loading, setLoading] = useState(false);
    const [addPriceAmount, setAddPriceAmount] = useState(poster.price);
    const [inputError, setInputError] = useState(null);
    const [addPicture, setAddPicture]= useState();
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const [getCategories,setCategories]= useState([]);



    const mockVal = (str) => ({
      value:str,
    });
  
    const onSearch = (searchText) => {
      setOptions(
        !searchText ? [] : getCategories.map( el =>   mockVal(el.value)),
      );
    };
  
    const onSelect = (data) => {
      console.log('onSelect', data);
    };
  
    const onChange = (data) => {
      setValue(data);
    };
    const getCategoriesData = async () => {

      let response = await APIClient.request(
        '/api/test/get-all-categories',
        {},
        'GET'
      );
  
      
  
      setCategories(response);
      console.log('poster data :',getCategories.map( el => el.value));
    }

useEffect(() => {
  
 
    getCategoriesData()
  
}, [])



    const onFinish = async (values) => {
        try {
          setLoading(true);
          let data = new FormData();
          data.append("x-access-token",jwt.getHeader());
          data.append("image",addPicture);
          data.append("posterData",values.poster)
          data.append("price",addPriceAmount);
          data.append("phone_number",values.phone_number);
          data.append('category',values.category)
          axios.post(
            '/api/test/register-poster',
            data
          );

          setLoading(false);
          setIsEditPosterModalVisible(false);
          message.info("Esi pievienojis sludinājumu");

          

        } catch (err) {
          message.error("Neizdevās pievienot sludinājumu");
          setLoading(false);
          console.log(err);

        }
        
        setupdate(!update);
      };


      
    return (
        <>
        <Modal title="Rediģēt sludinājumu" visible={isEditPosterModalVisible} footer={null}  onCancel={() => setIsEditPosterModalVisible(false)}>
              <Row align="middle" justify="center" className="h-100" >
            <Col xs={22} sm={16} md={12} lg={8}>
              <div className="edit-card">
         
                <Form
                  enctype="multipart/form-data"
                  name="normal_edit"
                  className="edit-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                    <input type="file"
                    
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setAddPicture(e.target.files[0])}} />
                    <Form.Item
                    name="posterData"
                    initialValue={poster.poster}
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
                  <Form.Item name="category" initialValue={poster.category}>
                    

                    <AutoComplete
                     
        options={options}
        
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Ievadi kategoriju"
      />

                  </Form.Item>
                  
     
               
                  <Input
        error={inputError}
        placeholder="0.00"
        value={poster.price}
        
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
      initialValue={poster.phone_number}
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
