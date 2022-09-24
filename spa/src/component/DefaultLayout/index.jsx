import { Layout, Modal, Button, Menu, Dropdown, Spin } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "./logo.png";
import jwt from "../../utils/jwt";
import {
  PlusOutlined,
  LogoutOutlined,
  SyncOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";
import APIClient from "../../utils/apiClient";
import Cookies from "js-cookie";
import LogInModal from "../LogInModal";
import SignUpModal from "../SignUpModal";
import AddPosterModal from "../AddPosterModal";
import ContentPoster from "../ContentPoster";
import PosterViewModel from "../PosterViewModel";
import MyPosters from "../MyPosters";
import History from "../HistoryModels";
import AdminPoster from "../AdminPoster";
import Category from "../Category";

import { NavLink, Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";


const DefaultLayout = () => {
  const [userCredential, setUserCredential] = useState([]);
  const [isActiveAdminPermisson, setIsActiveAdminPermisson] = useState(false);
  const [isPosterLoading, isSetPosterLoading] = useState(true);
  const [update, setupdate] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(jwt.isAuthorized());
  const [isAddPosterModalVisible, setIsAddPosterModalVisible] = useState(false);
  const [isEditPosterModalVisible, setIsEditPosterModalVisible] =
    useState(false);
  const [getCategories, setCategories] = useState([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState([]);
  const logOut = async () => {
    Cookies.remove("jwt_token");
    setIsSignedIn(false);
  };

  const getUsername = async () => {
    try {
      console.log({ "x-access-token": jwt.getHeader().toString() });
      let response = await APIClient.request(
        "/api/test/get-user-credential",
        { "x-access-token": jwt.getHeader().toString() },
        "POST"
      );

      console.log("username: ", response);
      setUserCredential(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoriesData = async () => {
    setCategoriesLoading(true);
    let response = await APIClient.request(
      "/api/test/get-all-categories",
      {},
      "GET"
    );

    setCategories(response);
    console.log(
      "poster data :",
      getCategories.map((el) => el.value)
    );
    setCategoriesLoading(false);
  };

  useEffect(() => {
    getCategoriesData();
  }, [update]);

  useEffect(() => {
    getUsername();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item disabled style={{ color: "black" }}>
        Lietotājs: {userCredential.username}
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/myHistory">Vēsture</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/myPosters">Mani sludinājumi</NavLink>
      </Menu.Item>
    </Menu>
  );

  const categoriesMenu = (
    <Menu>
      {getCategories.map((el) => (
        <Menu.Item>
          <NavLink to={"/category/" + el.value} onClick={() => setIsOpened(false)} ><div className="category-name">{el.value}</div></NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );

  const { Header, Content, Footer } = Layout;
  return (
    <>
      <Layout className="layout">

        <Content style={{ padding: "0 5px" }}>
          <BrowserRouter>
            <Header>
              <NavLink to="/">
                <img src={logo} height="100%" alt="" />
              </NavLink>

              {isSignedIn
                ? [

                  <Dropdown overlay={menu} trigger={["click"]}>
                    <UserOutlined className="left-profile" />
                  </Dropdown>,
                  <PlusOutlined
                    className="left"
                    onClick={() => setIsAddPosterModalVisible(true)}
                  />,
                  <LogoutOutlined className="left" onClick={logOut} />,
                ]
                : [
                  <Button type="default" className="auth" onClick={showModal}>
                    Ielogoties
                  </Button>,
                  <Button
                    type="primary"
                    className="auth"
                    onClick={() => setIsSignUpModalVisible(true)}
                  >
                    Piereģistrēties
                  </Button>,
                ]}
            </Header>
            <Routes>

              <Route path="/poster/:id"
                element={
                  <PosterViewModel

                    userCredential={userCredential}
                    isSignedIn={isSignedIn}
                    update={update}
                    setupdate={setupdate}
                    isEditPosterModalVisible={isEditPosterModalVisible}
                    setIsEditPosterModalVisible={setIsEditPosterModalVisible}
                    isActiveAdminPermisson={isActiveAdminPermisson}
                    setIsActiveAdminPermisson={setIsActiveAdminPermisson}

                  />
                } ></Route>
              <Route exact to path="/myPosters" element={isSignedIn ? <MyPosters

                isPosterLoading={isPosterLoading}
                isSetPosterLoading={isSetPosterLoading}
                update={update}
                setupdate={setupdate}
              /> : <Navigate to="/" />
              } />


              <Route exact path="/myHistory" element={isSignedIn ? <History
                isPosterLoading={isPosterLoading}
                isSetPosterLoading={isSetPosterLoading}
                update={update}
                setupdate={setupdate}
              /> : <Navigate to="/" />
              } />



              <Route path="/category/:category" element={<Category
                isPosterLoading={isPosterLoading}
                isSetPosterLoading={isSetPosterLoading}
                update={update}

                categoriesMenu={categoriesMenu}
                isCategoriesLoading={isCategoriesLoading}

                isOpened={isOpened}
                setIsOpened={setIsOpened}
              />} />

              <Route path="/admin" element={<AdminPoster isSignedIn={isSignedIn} update={update} 
              isActiveAdminPermisson={isActiveAdminPermisson}
              setIsActiveAdminPermisson={setIsActiveAdminPermisson}
              />}></Route>

              <Route exact to path="/" element={<div><Spin spinning={isCategoriesLoading}>
                <Dropdown className="left-category-menu" overlay={categoriesMenu}
                  onVisibleChange={(el) => setIsOpened(el)}
                  trigger={["click"]}  >
                  <p style={isOpened ? { backgroundColor: "#dcdcdc" } : { backgroundColor: "whitesmoke" }
                  }> <RightOutlined
                      // rotate={isOpened ? 90 : 0}
                      style={isOpened ? { transform: "rotate(0deg)", transitionDuration: "0.3s" } : {
                        transform: "rotate(90deg)", transitionDuration: "0.3s"
                      }}
                    /> Kategorijas</p>
                </Dropdown>
              </Spin>
                <hr />
                <div>
                  <SyncOutlined
                    onClick={() => setupdate(!update)}
                    spin={isPosterLoading}
                  />
                </div>
                <hr />
                <div className="site-layout-content">
                  <ContentPoster
                    isPosterLoading={isPosterLoading}
                    isSetPosterLoading={isSetPosterLoading}
                    update={update}
                    setupdate={setupdate}
                  />
                </div></div>} />

              <Route exact path="*" element={<h1>Nav atrasta lapa</h1>}>

              </Route>


            </Routes>
          </BrowserRouter>

        </Content>
        <Footer className="footer">
          ©2021 izveidoja Jānis Feldmanis
        </Footer>
      </Layout>
      <LogInModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsSignedIn={setIsSignedIn}
        setUserCredential={setUserCredential}
      />
      <SignUpModal
        isModalVisible={isSignUpModalVisible}
        setIsModalVisible={setIsSignUpModalVisible}
      />
      <AddPosterModal

        isPosterLoading={isPosterLoading}

        isAddPosterModalVisible={isAddPosterModalVisible}
        setIsAddPosterModalVisible={setIsAddPosterModalVisible}
        update={update}
        setupdate={setupdate}
      />
    </>
  );
};

export default DefaultLayout;
