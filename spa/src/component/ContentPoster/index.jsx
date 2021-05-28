import React, { useState, useEffect } from 'react';
import {Spin,Card, Button} from 'antd';
import APIClient from '../../utils/apiClient';

// import Nuberfromarter from 'utils/numberFormatter';
import moment from 'moment';
// import './styles.scss';


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
   
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src= {"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>

                    )}
            
            </Spin>

          
        </div>
     
    )

}
export default Cards;