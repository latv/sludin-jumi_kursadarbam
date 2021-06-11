import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState } from 'react';
import './styles.css';

export default function PosterViewModel({poster,setIsModalVisible,isModalVisible}) {
   



 

    return (
        <>
        <Modal title='Sludinājuma apskate' visible={isModalVisible} footer={null}  onCancel={() => setIsModalVisible(false)}>
              <Row align="middle" justify="center" className="h-100" >
            <Col xs={22} sm={16} md={12} lg={8}>
             <div className='poster'>
                  <img className='img_poster' src={"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} alt="" />
                  <p>{poster.poster}</p>
                  <p>Kategorija: {poster.category}</p>
                  <p>Cena: {poster.price}</p>
                  <p>Talruna numurs: {poster.phone_number}</p>
                  <p>Izveidots: {
                  poster.createdAt}</p>


             </div>
            </Col>
          </Row>
        </Modal>
        </>
    )
}
