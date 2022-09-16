import React, { useState, useEffect } from "react";
import { Spin, Card, Menu, Row, Dropdown } from "antd";
import APIClient from "../../utils/apiClient";
import { NavLink, useParams } from "react-router-dom";
import "./styles.css";
import {

  RightOutlined,
} from "@ant-design/icons";

const Cards = ({
  isSetPosterLoading,
  isPosterLoading,
  update,
  categoriesMenu,
  isCategoriesLoading,
  isOpened,
  setIsOpened
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
  const { category } = useParams();

  useEffect(() => {
    getPoster();
  }, [category]);
  return (
    <>
      <Spin spinning={isCategoriesLoading}>
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
