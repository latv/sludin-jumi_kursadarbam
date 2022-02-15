import React, { useState, useEffect } from "react";
import { Spin, Card, Button, Row } from "antd";
import APIClient from "../../utils/apiClient";
import { NavLink } from "react-router-dom";
import "./style.css";

const Cards = ({
  isSetPosterLoading,
  isPosterLoading,
  update,
}) => {
  const { Meta } = Card;
  const [poster, setPoster] = useState([]);
  const getPoster = async () => {
    isSetPosterLoading(true);
    let response = await APIClient.request("/api/test/get-poster", {}, "GET");

    console.log("poster data :", response);

    setPoster(response);
    isSetPosterLoading(false);
  };

  useEffect(() => {
    getPoster();
  }, [update]);

  return (
    <div className="cards">
      <Row wrap={true}>
        <Spin spinning={isPosterLoading}>
          {poster.map((poster) => (
            <NavLink to={"/poster/" + poster.id}>
              <Card
                className="card"
                hoverable
                cover={
                  <img
                    src={
                      poster.image === undefined
                        ? "http://localhost:8080/uploads/no-image.jpg"
                        : "http://localhost:8080/uploads/thumbnails/" +
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
