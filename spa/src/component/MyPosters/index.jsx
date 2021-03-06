import React, { useState, useEffect } from "react";
import { Spin, Card, Button, Row } from "antd";
import APIClient from "../../utils/apiClient";

import { NavLink } from "react-router-dom";
import "./styles.css";

const Cards = ({

  isSetPosterLoading,
  isPosterLoading,
  update,
}) => {
  const { Meta } = Card;
  const [poster, setPoster] = useState([]);
  const getPoster = async () => {
    try{
    isSetPosterLoading(!isPosterLoading);
    let response = await APIClient.request(
      "/api/test/get-my-poster",
      {},
      "GET"
    );

    console.log("poster data :", response);

    setPoster(response);
    isSetPosterLoading(false);}
    catch {
      isSetPosterLoading(false);
      setPoster({ status: 404 });
    }
  };

  useEffect(() => {
    getPoster();
  }, [update]);

  return (
    <div className="cards">
      <Row wrap={true}>
        <Spin spinning={isPosterLoading}>
          {poster.status == 404? <p>Nav ievototi sludinājumi</p>: poster.map((poster) => (
            <NavLink to={"/poster/" + poster.id}>
              <Card
                className="card"
                hoverable
                cover={
                  <img
                    src={
                      "http://localhost:8080/uploads/" +
                      poster.image.split("\\")[1]
                    }
                    className="card__image"
                  />
                }
              >
                <Meta
                  title={poster.poster}
                  description={"cena " + poster.price + " EUR"}
                />
              </Card>
            </NavLink>
          ))}
        </Spin>
      </Row>
    </div>
  );
};
export default Cards;
