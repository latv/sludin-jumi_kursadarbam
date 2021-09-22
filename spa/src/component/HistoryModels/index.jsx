import React, { useState, useEffect } from 'react';
import {Spin,Tag} from 'antd';
import APIClient from '../../utils/apiClient';

import PosterViewModel from '../PosterViewModel';
import { NavLink } from 'react-router-dom';
import './styles.css';
import Table from 'rc-table/lib/Table';


const Cards = ({  isSetPosterLoading,isPosterLoading,update}) => {
    
    const [poster,setPoster] = useState({});


    const getPoster = async () => {
      isSetPosterLoading(true)
        let response = await APIClient.request(
          '/api/test/get-my-history',
          {},
          'GET'
        );
    
        console.log('poster data :',response);
    
        setPoster(response);
        isSetPosterLoading(false);
      }

   
      useEffect(() => {


        getPoster();
      }, [update]);
      const columns = [
        {
          title: 'poster',
          dataIndex: 'poster',
          key: 'poster',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'image',
          dataIndex: 'image',
          key: tag =>  <img src= {"http://localhost:8080/uploads/"+tag.split("\\")[1]}  className="card__image"/>,
        },
      ];
    

    return (

        
          
        <>
            <Spin spinning={isPosterLoading}>
                <Table columns={columns} dataSource={poster.map( (e) => e[0])} />
            </Spin>

        </>
     
    )

}
export default Cards;