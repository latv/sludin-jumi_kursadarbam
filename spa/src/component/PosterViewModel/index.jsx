import { Layout,Modal,Button,message,Row,Col,Form,Input,Card,Comment } from 'antd';
import React, { useState ,useEffect} from 'react';
import './styles.css';
import APIClient from '../../utils/apiClient';
import { NavLink } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';
export default function PosterViewModel() {
  const xsWidth = 22;
  const mdWidth = 18;
  const lgWidth = 16;

  const [poster, setPoster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
useEffect(() => {

 getPosterData();
   
  
}, []);


 const getPosterData = async () => {
   try{
  const path = window.location.pathname.toString();
  console.log('path '+ path)
  let response = await APIClient.request(
  'api/test/get-poster'+path,
  {},
  'GET'
);
console.log("poster: "+poster )
setPoster(response);
setIsLoading(false);
  }catch (err) {
    console.log(err)
  }

}

    return (
        <>
        <div>
        
              <Row align="middle" justify="center" xs={xsWidth} md={mdWidth} lg={lgWidth} >
            <Col xs={22} sm={16} md={12} lg={8}>
            <div>
            <NavLink to="/">
              <LeftCircleOutlined className='backButton'/>
            </NavLink>
            </div>
             <Card loading={isLoading}  className='poster'>
         
                  {isLoading ? null : <img className='img_poster' src={"http://localhost:8080/uploads/"+poster.image.split("\\")[1]} alt="" />}
                  <p>{poster.poster}</p>
                  <p>Kategorija: {poster.category}</p>
                  <p>Cena: {poster.price} &euro;</p>
                  <p>Talruna numurs: {poster.phone_number}</p>
                  <p>Izveidots: {

                  isLoading ? null : poster.createdAt.split("T")[0] + " " + poster.createdAt.split("T")[1].split(".")[0]} </p>


             </Card >
             <>
        {/* {comments.length > 0 && <CommentList comments={comments} />} */}
        <Comment
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt=""
        />
      </>
            </Col>
          </Row>
        </div>
        </>
    )
}
