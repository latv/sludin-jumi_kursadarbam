import {
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
import React, { useState, useEffect } from "react";
import "./styles.css";
import APIClient from "../../utils/apiClient";
import { useHistory } from "react-router-dom";

import { LeftCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import EditPosterModal from "../EditPosterModal";

export default function PosterViewModel({
  userCredential,
  isSignedIn,
  update,
  setupdate,
  isEditPosterModalVisible,
  setIsEditPosterModalVisible,
}) {
  const xsWidth = 22;
  const mdWidth = 18;
  const lgWidth = 16;

  const [poster, setPoster] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getPosterData();
  }, []);

  const deleteById = async () => {
    const path = window.location.pathname.toString();
    console.log("path " + path);
    let response = await APIClient.request(
      "/api/test/delete-poster" + path,
      {},
      "POST"
    );
    message.info("Izdzēst sekmīgi šis sludinājums");
    goBack();
  };

  const getPosterData = async () => {
    try {
      setIsLoading(true);
      const path = window.location.pathname.toString();
      console.log("path " + path);
      let response = await APIClient.request(
        "api/test/get-poster" + path,
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
                {isSignedIn && userCredential.id === poster.userId ? (
                  <div>
                    <Button onClick={() => setIsEditPosterModalVisible(true)}>
                      Rediģēt
                    </Button>

                    <Popconfirm
                      title="Vai patiešām vēliess izdzēst šo sludinājumu?"
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
