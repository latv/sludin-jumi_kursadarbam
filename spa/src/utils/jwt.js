import Cookies from 'js-cookie';


const saveToken = (token, expires) => {
    const expirationDate = new Date(new Date().getTime() + expires * 1000);
    Cookies.set('jwt_token', token, { expires: expires });

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
