import React, { useState, useEffect } from "react";
import { Spin, Card, Button, Row, Dropdown } from "antd";
import APIClient from "../../utils/apiClient";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";

const Cards = ({
  isSetPosterLoading,
  isPosterLoading,
  update,
  categoriesMenu,
  isCategoriesLoading,
}) => {
  const { Meta } = Card;
  const [poster, setPoster] = useState([]);
  const getPoster = async () => {
    isSetPosterLoading(!isPosterLoading);
    const path = window.location.pathname.toString();
    let response = await APIClient.request("/api/test" + path, {}, "GET");

    console.log("poster data :", response);

    setPoster(response);
    isSetPosterLoading(false);
  };
  // const history = useNavigate();

  // useEffect(() => {
  //   // return history.listen((location) => {
  //   //   getPoster();
  //   // });
  //   console.log("back");
  // }, [history]);

  useEffect(() => {
    getPoster();
  }, [update]);

  return (
    <>
      <Spin spinning={isCategoriesLoading}>
        <Dropdown overlay={categoriesMenu} trigger={["click"]}>
          <p className="left-profile">Kategorija</p>
        </Dropdown>
      </Spin>
      <div className="cards">
        <Row wrap={true}>
          <Spin spinning={isPosterLoading}>
            {poster.map((poster) => (
              <NavLink to={"/" + poster.id}>
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
    </>
  );
};
export default Cards;
