import React, { useState, useEffect } from 'react';
import {Spin,Card, Button,Row} from 'antd';
import APIClient from '../../utils/apiClient';

import PosterViewModel from '../PosterViewModel';
import { NavLink } from 'react-router-dom';
import './style.css';


const Cards = ({poster,setPoster,  isSetPosterLoading,isPosterLoading,  isAddPosterModalVisible,setIsAddPosterModalVisible,update}) => {
    const { Meta } = Card;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getPoster = async () => {
      isSetPosterLoading(!isPosterLoading)
        let response = await APIClient.request(
          '/api/test/get-poster',
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
    
    

    return (

        <div className="cards">
            <Row wrap={true}>
            <Spin spinning={isPosterLoading}>
                    {poster.map((poster) =>
                    
                    <NavLink to={"/"+poster.id}>
    <Card className='card'
    
    hoverable
    cover={<img src= {"http://localhost:8080/uploads/"+poster.image.split("\\")[1]}  className="card__image"/>}
  
  >

    
   <Meta title={poster.poster} description= {'cena '+poster.price+" EUR"}    />
  
 
  </Card>
  </NavLink>

                    )}
            
            </Spin>
            </Row>
          
        </div>
     
    )

}
export default Cards;