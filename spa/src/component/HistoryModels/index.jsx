import React, { useState, useEffect } from "react";
import { Spin, Tag, Button, Table } from "antd";
import APIClient from "../../utils/apiClient";

import PosterViewModel from "../PosterViewModel";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Cards = ({ isSetPosterLoading, isPosterLoading, update }) => {
  const [posterData, setPosterData] = useState([]);

  const getPoster = async () => {
    isSetPosterLoading(true);
    let response = await APIClient.request(
      "/api/test/get-my-history",
      {},
      "GET"
    );

    setPosterData(response);

    isSetPosterLoading(false);
  };

  useEffect(() => {
    getPoster();
  }, [update]);
  const columns = [
    {
      title: "Nosaukums",
      dataIndex: "poster",
      key: "poster",
    },
    {
      title: "cena",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Attēls",
      dataIndex: "image",
      key: "image",
      render: (value) => {
        return !!value ? (
          <img
            className="img_poster"
            src={"http://localhost:8080/uploads/" + value.split("\\")[1]}
            alt=""
          />
        ) : null;
      },
    },
    {
      title: "atvērt",
      dataIndex: "id",
      key: "id",
      render: (value) => {
        return (
          <NavLink to={"/" + value}>
            <Button>Skatīt</Button>
          </NavLink>
        );
      },
    },
  ];

  return (
    <>
      <Spin spinning={isPosterLoading}>
        <Table
          rowKey={"id"}
          dataSource={posterData}
          columns={columns}
          loading={isPosterLoading}
        />
      </Spin>
    </>
  );
};
export default Cards;
