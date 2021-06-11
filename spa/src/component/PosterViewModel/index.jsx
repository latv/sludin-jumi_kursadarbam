import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState ,useEffect} from 'react';
import './styles.css';
import APIClient from '../../utils/apiClient';
export default function PosterViewModel() {


  const [poster, setPoster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
useEffect(() => {

 getPosterData();
   
  
}, []);


 const getPosterData = async () => {
   try{
  const path = window.location.pathname; 
  let response = await APIClient.request(
  'http://127.0.0.1:8080/api/test/get-poster'+path,
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
              <Row align="middle" justify="center" className="h-100" >
            <Col xs={22} sm={16} md={12} lg={8}>
             <div className='poster'>
                  {/* <img className='img_poster' src={"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} alt="" /> */}
                  <p>{poster.poster}</p>
                  <p>Kategorija: {poster.category}</p>
                  <p>Cena: {poster.price}</p>
                  <p>Talruna numurs: {poster.phone_number}</p>
                  <p>Izveidots: {
                  poster.createdAt}</p>


             </div>
            </Col>
          </Row>
        </div>
        </>
    )
}
