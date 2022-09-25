import {
  // posterID,
  Layout,
  Modal,
  Button,
  message,
  Row,
  Col,
  Form,
  Input,
  Card,
  Comment,
  Avatar,
  Popconfirm,
} from "antd";
import { useParams } from 'react-router';
import React, { useState, useEffect } from "react";
import "./styles.css";
import APIClient from "../../utils/apiClient";
import jwt from "../../utils/jwt";
import { useNavigate } from "react-router-dom";

import { LeftCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditPosterModal from "../EditPosterModal";

export default function PosterViewModel({

  userCredential,
  isSignedIn,
  update,
  setupdate,
  isEditPosterModalVisible,
  setIsEditPosterModalVisible,
  isActiveAdminPermisson,
  setIsActiveAdminPermisson
}) {
  const xsWidth = 22;
  const mdWidth = 18;
  const lgWidth = 16;
  // const { id } = useParams();
  const [poster, setPoster] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
    console.log("back");
  };

  useEffect(() => {
    getPosterData();
  }, []);

  const deleteById = async () => {
    const path = window.location.pathname.toString().split("/")[2];
    console.log("path " + path.split("/")[2]);
    // let { ID } = useParams();

    let response = await APIClient.request(
      "/api/test/delete-poster/" + path,
      {"x-access-token": jwt.getHeader().toString()},
      "POST"
    );
    message.info("Izdzēsts sekmīgi šis sludinājums");
    goBack();
  };

  const getPosterData = async () => {
    try {


      setIsLoading(true);
      const path = window.location.pathname.toString();
      console.log("path " + path.split("/")[2]);

      let response = await APIClient.request(
        "/api/test/get-poster/" + path.split("/")[2],
        {},
        "GET"
      );

      setPoster(response);
      console.log("poster: " + poster.status);

      setIsLoading(false);
    } catch (err) {
      console.log(err);

      setPoster({ status: 404 });
    }
  };

  return (
    <>
      {poster.status != 404 ? (
        <div>
          <EditPosterModal
            getPosterData={getPosterData}
            update={update}
            setupdate={setupdate}
            isEditPosterModalVisible={isEditPosterModalVisible}
            setIsEditPosterModalVisible={setIsEditPosterModalVisible}
            poster={poster}
            isLoading={isLoading}
          />
          <Row
            align="middle"
            justify="center"
            xs={xsWidth}
            md={mdWidth}
            lg={lgWidth}
          >
            <Col xs={22} sm={16} md={12} lg={8}>
              <div>
                <LeftCircleOutlined onClick={goBack} className="backButton" />
              </div>
              <Card loading={isLoading} className="poster">
                {isLoading ? null : (
                  <img
                    className="img_poster_view_model"
                    src={
                      "http://localhost:8080/uploads/" +
                      poster.image.split("\\")[1]
                    }
                    alt=""
                  />
                )}
                <p>{poster.poster}</p>
                <p>Kategorija: {poster.category}</p>
                <p>Cena: {poster.price} &euro;</p>
                <p>Talruna numurs: {poster.phone_number}</p>
                <p>
                  Izveidots:{" "}
                  {isLoading
                    ? null
                    : poster.createdAt.split("T")[0] +
                    " " +
                    poster.createdAt.split("T")[1].split(".")[0]}{" "}
                </p>
                <p>Skatīts: {poster.viewed}</p>
                {(isSignedIn && ((userCredential.id === poster.userId) ) || isActiveAdminPermisson === true) ? (
                  <div class="center" >
                    <Button onClick={() => setIsEditPosterModalVisible(true)}>
                      <EditOutlined /> Rediģēt
                    </Button>

                    <Popconfirm
                      title="Vai patiešām vēlies izdzēst šo sludinājumu?"
                      okText="Jā"
                      cancelText="Nē"
                      onConfirm={deleteById}

                    >
                      <Button><DeleteOutlined /> Dzēst</Button>
                    </Popconfirm>
                  </div>
                ) : null}
              </Card>
              <>
                {/* {comments.length > 0 && <CommentList comments={comments} />} */}
              </>
            </Col>
          </Row>
        </div>
      ) : (
        <h1>Sludinājums netika atrasts</h1>
      )}
    </>
  );
}
