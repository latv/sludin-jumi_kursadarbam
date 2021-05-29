import React, { useState, useEffect } from 'react';
import {Spin,Card, Button} from 'antd';
import APIClient from '../../utils/apiClient';

// import Nuberfromarter from 'utils/numberFormatter';
import moment from 'moment';
import './style.css';


const Cards = () => {
    const { Meta } = Card;
    const [poster, setPoster] = useState([]);
    const [isPosterLoading, isSetPosterLoading] = useState(true);
    const getPoster = async () => {

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
      }, []);
    
    

    return (

        <div className="cards">
            
            <Spin spinning={isPosterLoading}>
                    {poster.map((poster) =>
   
    <div
    className='card' 
    
    
  
  >
    <div className="header">
      <img alt="example" class="card__image" src= {"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} />
      </div>
      <div className="body">
    <h1>{poster.poster}</h1>
    <p1> {'cena '+poster.price+" EUR"} </p1>
    </div>
  </div>

                    )}
            
            </Spin>

          
        </div>
     
    )

}
export default Cards;