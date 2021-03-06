import axios from 'axios';
import jwt from './jwt';
import {message} from 'antd';
import Cookies from 'js-cookie';
const request = async (url, data, method,isAuthorized=true) => {
  
  const requestConfig = {
    
    url: url,
    method: method,
    baseURL: process.env.REACT_APP_BACKEND_URL,
    responseType: 'json',
    // headers: {'Authorization': jwt.getHeader()}
  };
  if (jwt.isAuthorized())
  {
    requestConfig.headers = {
   
      'Content-Type': 'multipart/form-data',
      "x-access-token" : jwt.getHeader()};
  }

  if (method === 'GET') {
    requestConfig.params = data;
  } else {
    requestConfig.data = data;
  }

  try {
    const response = await axios.request(requestConfig);

    return response.data;
  } catch (e) {
    console.log('error: ',e.response.status);
    if(e.response.status === 401 && isAuthorized === true){
      try{
      let response = await request('/api/auth/refresh',{},"GET",false);
      console.log(response);}catch(e){
        message.error('you token is expired');
        jwt.deleteToken();

      }finally{
        Cookies.remove('jwt_token');
        jwt.saveToken(response.data.accessToken,response.data.expiresIn)
        let response = await request(url, data, method,false);
        return response.data;
      }

    }
    
    throw e;


  }
}

export default { request };
