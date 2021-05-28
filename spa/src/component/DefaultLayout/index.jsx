import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import logo from './logo_transparent.png'
import jwt from '../../utils/jwt';
import { PlusOutlined, LogoutOutlined,  } from '@ant-design/icons';
import APIClient from '../../utils/apiClient';
import Cookies from 'js-cookie';
import LogInModal from '../LogInModal';
import AddPosterModal from '../AddPosterModal';
import ContentPoster from '../ContentPoster'

const DefaultLayout = () =>{

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignedIn,setIsSignedIn]= useState(jwt.isAuthorized());
  const [isAddPosterModalVisible,setIsAddPosterModalVisible] = useState(false);
  const logOut = async () => {
    try {
      let response = await APIClient.request(
        '/api/auth/logout',
        {},
        'POST'
      );
  
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  
    Cookies.remove('jwt_token');
    setIsSignedIn(false);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };


  

 
const { Header, Content, Footer } = Layout; 
return (
<>
<Layout className="layout">
    <Header>
      <img src={logo}  height='100%' alt=""/>
      {isSignedIn ? [<LogoutOutlined onClick={logOut} />, <PlusOutlined onClick={() => setIsAddPosterModalVisible(true)}/>] :    <Button type="primary" onClick={showModal}>
        Ielogoties
      </Button>}
    </Header>
    <Content style={{ padding: '0 50px' }}>
      
      <div className="site-layout-content">
        <ContentPoster/>
        
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2021 izveidoja Jānis Feldmanis</Footer>
  </Layout>
  <LogInModal isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible} setIsSignedIn={setIsSignedIn} />
  <AddPosterModal isAddPosterModalVisible={isAddPosterModalVisible} setIsAddPosterModalVisible={setIsAddPosterModalVisible} />
</>
)}

export default DefaultLayout;