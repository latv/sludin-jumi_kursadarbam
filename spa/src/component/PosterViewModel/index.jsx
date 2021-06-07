import { Layout,Modal,Button,message,Row,Col,Form,Input } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

export default function PosterViewModel({poster,setIsModalVisible,isModalVisible}) {
   



 

    return (
        <>
        <Modal title='Sludinājuma apskate' visible={isModalVisible} footer={null}  onCancel={() => setIsModalVisible(false)}>
              <Row align="middle" justify="center" className="h-100" >
            <Col xs={22} sm={16} md={12} lg={8}>
             <div className='poster'>
                  <img src={"http://127.0.0.1:8080/uploads/"+poster.image.split("\\")[1]} alt="" />
                  <p>{poster.category}</p>

             </div>
            </Col>
          </Row>
        </Modal>
        </>
    )
}
