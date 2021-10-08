import { Layout,Modal,Button,message,Row,Col,Form,Input,Card,Comment , Avatar} from 'antd';
import React, { useState ,useEffect} from 'react';
import './styles.css';
import APIClient from '../../utils/apiClient';
import { NavLink,useHistory } from 'react-router-dom';
import jwt from '../../utils/jwt';
import { LeftCircleOutlined } from '@ant-design/icons';
import EditPosterModal from "../EditPosterModal";
const { TextArea } = Input;

export default function PosterViewModel({userCredential,isSignedIn, update,setupdate,isEditPosterModalVisible , setIsEditPosterModalVisible}) {
  const xsWidth = 22;
  const mdWidth = 18;
  const lgWidth = 16;

  const [poster, setPoster] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [is_Found, setIs_Found] = useState(true)
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

   
useEffect(() => {

 getPosterData();
   
  
}, []);


const deleteById = async () => {
  
 const path = window.location.pathname.toString();
 console.log('path '+ path)
 let response = await APIClient.request(
 '/api/test/delete-poster'+path,
 {},
 'POST'
);
message.info(response.message);
goBack();
}

 const getPosterData = async () => {
   try{
  const path = window.location.pathname.toString();
  console.log('path '+ path)
  let response = await APIClient.request(
  'api/test/get-poster'+path,
  {},
  'GET'
);

setPoster(response);
console.log("poster: "+poster.status );

setIsLoading(false);
// poster.status===404 ? setIsLoading(true): setIsLoading(false);



  }catch (err) {
    console.log(err);
    // setIsLoading(false);
    setPoster({status:404});
  }

}

    return (
        <>{poster.status!=404 ? <div>
          <EditPosterModal update={update} setupdate={setupdate} isEditPosterModalVisible={isEditPosterModalVisible}  setIsEditPosterModalVisible={setIsEditPosterModalVisible} poster={poster} isLoading={isLoading}/>
          <Row align="middle" justify="center" xs={xsWidth} md={mdWidth} lg={lgWidth} >
            <Col xs={22} sm={16} md={12} lg={8}>
            <div>
            
              <LeftCircleOutlined onClick={goBack} className='backButton'/>
            
            </div>
             <Card loading={isLoading}  className='poster'>
         
                  {isLoading ? null : <img className='img_poster' src={"http://localhost:8080/uploads/"+poster.image.split("\\")[1]} alt="" />}
                  <p>{poster.poster}</p>
                  <p>Kategorija: {poster.category}</p>
                  <p>Cena: {poster.price} &euro;</p>
                  <p>Talruna numurs: {poster.phone_number}</p>
                  <p>Izveidots: {

                  isLoading ? null : poster.createdAt.split("T")[0] + " " + poster.createdAt.split("T")[1].split(".")[0]} </p>
                <p>Skatīts: {poster.viewed}</p>  
                    { isSignedIn && userCredential.id===poster.userId ?
                      
                      <div><Button onClick={() => setIsEditPosterModalVisible(true)}
                    
                    >Rediģēt</Button>

                    <Button onClick={deleteById}
                    
                    >Dzēst</Button>
                    </div>
                    
                    : null}
             </Card >
             <>
        {/* {comments.length > 0 && <CommentList comments={comments} />} */}


 
      </>
            </Col>
          </Row>
        </div> : <h1>Sludinājums netika atrasts</h1>}
        
        </>
    )
}
