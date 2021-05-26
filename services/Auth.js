import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  /*const resJSON = {
    access_token: ''
  };*/

  try {
    const res = Cookies.get('RTVCPLAYUSERT');
    const resJSON = res ? JSON.parse(res) : null;
    ApiService.resetAccessToken();
    ApiService.setAccessToken(resJSON.access_token);
    return true;
  } catch (error) {
    // console.log('Auth - IsLoggedIn Error', error);
  }
  return false;
};

export default {
  isLoggedIn,
};