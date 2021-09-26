import React, { useState, useEffect } from "react";
import { Spin, Tag, Button } from "antd";
import APIClient from "../../utils/apiClient";

import PosterViewModel from "../PosterViewModel";
import { NavLink } from "react-router-dom";
import "./styles.css";
import Table from "rc-table/lib/Table";

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
    // console.log('poster data :',));
    // console.log(poster.map(e => poster[e]));
    isSetPosterLoading(false);
  };

  useEffect(() => {
    getPoster();
  }, [update]);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <>
      {/* <Table columns={columns} dataSource={posterData.map( (e) => e)} /> */}
      <Spin spinning={!isSetPosterLoading}>
      <table>
        <tr>
          <th>nosaukums</th>
          <th>cena</th>
          <th>attēls</th>
          <th></th>
        </tr>
        {/* <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr> */}
        
        {posterData.map((e) => (
          <tr>
            <td>{e.poster}</td>
            <td>{e.price}</td>
            <td>
              {isPosterLoading ? null : (
                <img
                  className="img_poster"
                  src={
                    "http://localhost:8080/uploads/" + e.image.split("\\")[1]
                  }
                  alt=""
                />
              )}
            </td>
            <td>
              {
                <NavLink to={"/" + e.id}>
                  <Button>Skatīt</Button>
                </NavLink>
              }
            </td>
          </tr>
        ))}
     
      </table>
      </Spin>
    </>
  );
};
export default Cards;
