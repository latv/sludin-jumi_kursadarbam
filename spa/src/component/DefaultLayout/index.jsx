import { Layout,Modal,Button,Menu,Dropdown } from 'antd';
import React, { useState,useEffect } from 'react';
import './styles.css';
import logo from './logo.png';
import jwt from '../../utils/jwt';
import { PlusOutlined, LogoutOutlined,SyncOutlined ,UserOutlined} from '@ant-design/icons';
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
  const [username, setUsername] = useState([])
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

  const getUsername = async () => {
    try {
      console.log({"x-access-token":jwt.getHeader().toString()})
      let response = await APIClient.request(
        '/api/test/get-username',
        {"x-access-token":jwt.getHeader().toString()},
        'POST'
      );
  
      console.log('username: ',response);
      setUsername(response);
    } catch (err) {
      console.log(err)
    }
  
   
  }
useEffect( () =>
  {getUsername();}
, [])

  const showModal = () => {
    setIsModalVisible(true);
  };


  const menu = (
    <Menu>
      <Menu.Item disabled style={{color:"black"}}>
      Lietotājs: {username.username}
      </Menu.Item>
      <Menu.Item  >
        Vēsture
      </Menu.Item>
      <Menu.Item >
        profils
      </Menu.Item>
      <Menu.Item >Mani sludinājumi</Menu.Item>
    </Menu>
  );
 
const { Header, Content, Footer } = Layout; 
return (
<>
<Layout className="layout">
<BrowserRouter>
    <Header>
      
      <NavLink to="/"><img src={logo}  height='100%' alt=""/></NavLink>


      {isSignedIn ? [ <Dropdown overlay={menu} trigger={['click']} ><UserOutlined className='left-profile' /></Dropdown>,<PlusOutlined className='left' onClick={() => setIsAddPosterModalVisible(true)}/>,<  LogoutOutlined className='left' onClick={logOut} />] :    [<Button type="default" className='auth' onClick={showModal}>
        Ielogoties
      </Button>,<Button type="primary" className='auth' onClick={ () => setIsSignUpModalVisible(true) }>
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