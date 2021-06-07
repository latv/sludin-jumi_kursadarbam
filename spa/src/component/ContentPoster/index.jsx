import React, { useState, useEffect } from 'react';
import {Spin,Card, Button} from 'antd';
import APIClient from '../../utils/apiClient';

import PosterViewModel from '../PosterViewModel';

import './style.css';


const Cards = ({poster,setPoster,  isSetPosterLoading,isPosterLoading,  isAddPosterModalVisible,setIsAddPosterModalVisible,update}) => {
    const { Meta } = Card;
    const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedPoster, setSelectedPoster] = useState({});
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
            
            <Spin spinning={isPosterLoading}>
                    {poster.map((poster) =>
                    
   
    <div
    className='card' 
    
    
  
  >
    <div className="header">
      <img alt="example" className="card__image" src= {"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} />
      </div>
      <div className="card__content">
    <h1>{poster.poster}</h1>
    <p> {'cena '+poster.price+" EUR"} </p>
    <Button onClick={() => {console.log(poster);
    setSelectedPoster(poster);
    setIsModalVisible(true);
    }}>Apskatīt</Button>
    </div>
  </div>

                    )}
            
            </Spin>

          {isModalVisible ?<PosterViewModel poster={selectedPoster}  setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}/> : null}
        </div>
     
    )

}
export default Cards;