import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import logo from './logo.png';
import jwt from '../../utils/jwt';
import { PlusOutlined, LogoutOutlined,SyncOutlined } from '@ant-design/icons';
import APIClient from '../../utils/apiClient';
import Cookies from 'js-cookie';
import LogInModal from '../LogInModal';
import SignUpModal from '../SignUpModal';
import AddPosterModal from '../AddPosterModal';
import ContentPoster from '../ContentPoster'
import PosterViewModel from '../PosterViewModel'
import { NavLink } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';

const DefaultLayout = () =>{
  const [poster, setPoster] = useState([]);
  const [isPosterLoading, isSetPosterLoading] = useState(true);
  const [update,setupdate]= useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
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
<BrowserRouter>
    <Header>
      
      <NavLink to="/"><img src={logo}  height='100%' alt=""/></NavLink>
      {isSignedIn ? [<LogoutOutlined onClick={logOut} />, <PlusOutlined onClick={() => setIsAddPosterModalVisible(true)}/>] :    [<Button type="primary" onClick={showModal}>
        Ielogoties
      </Button>,<Button type="primary" onClick={ () => setIsSignUpModalVisible(true) }>
        Piereģistrēties
      </Button>]}
    </Header>
    <Content style={{ padding: '0 50px' }}>
      
      <Switch>
    <Route exact path="/">
      <hr />
    <SyncOutlined  onClick={() => setupdate(!update)} spin={isPosterLoading}/>
      <hr />
      <div className="site-layout-content">

        <ContentPoster poster={poster} setPoster={setPoster}  isPosterLoading={isPosterLoading} isSetPosterLoading={isSetPosterLoading} update={update} setupdate={setupdate} />
        
      </div>
      </Route>
      <Route path='/' component={PosterViewModel}>


      </Route>
      </Switch>
      
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2021 izveidoja Jānis Feldmanis</Footer>
    </BrowserRouter>
  </Layout>
  <LogInModal isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible} setIsSignedIn={setIsSignedIn} />
  <SignUpModal isModalVisible={isSignUpModalVisible}  setIsModalVisible={setIsSignUpModalVisible}  />
  <AddPosterModal poster={poster} setPoster={setPoster}  isPosterLoading={isPosterLoading} isPosterLoading={isPosterLoading}  isAddPosterModalVisible={isAddPosterModalVisible} setIsAddPosterModalVisible={setIsAddPosterModalVisible} update={update} setupdate={setupdate} />
</>
)}

export default DefaultLayout;