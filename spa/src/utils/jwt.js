import Cookies from 'js-cookie';


const saveToken = (token, expires) => {
 
    Cookies.set('jwt_token', token, { expires: 1});

}
const isAuthorized = () => {
    let token = Cookies.get('jwt_token');
    return !!token;
}
const deleteToken =()=>{
    Cookies.remove('jwt_token');
    window.location.reload();

}
const getHeader = () => {
    let token = Cookies.get('jwt_token');
    return token;

}
export default { saveToken, isAuthorized, getHeader,deleteToken };
