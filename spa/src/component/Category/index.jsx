import React, { useState, useEffect } from 'react';
import {Spin,Card, Button,Row,Dropdown} from 'antd';
import APIClient from '../../utils/apiClient';

import PosterViewModel from '../PosterViewModel';
import { NavLink ,useHistory} from 'react-router-dom';
import './styles.css';


const Cards = ({poster,setPoster,  isSetPosterLoading,isPosterLoading,  isAddPosterModalVisible,setIsAddPosterModalVisible,update,categoriesMenu,isCategoriesLoading}) => {
    const { Meta } = Card;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getPoster = async () => {
      isSetPosterLoading(!isPosterLoading)
      const path = window.location.pathname.toString();
        let response = await APIClient.request(
          '/api/test'+path,
          {},
          'GET'
        );
    
        console.log('poster data :',response);
    
        setPoster(response);
        isSetPosterLoading(false);
      }
      const history = useHistory();

      useEffect(() => {
          return history.listen((location) => {
              // console.log(`You changed the page to: ${location.pathname}`);
              getPoster();
          })
      },[history])
   
      useEffect(() => {


        getPoster();
      }, [update]);
    


    return (<>
      <Spin spinning={isCategoriesLoading}>
      <Dropdown overlay={categoriesMenu} trigger={["click"]} >
        <p className="left-profile" >Kategorija</p>
      </Dropdown>
    </Spin>
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
     </>
    )

}
export default Cards;