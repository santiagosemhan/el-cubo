import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const logout = () => {
  ApiService.resetAccessToken();
  Cookies.remove('RTVCPLAYUSERT');
};

const isLoggedIn = () => {
  const res = Cookies.get('RTVCPLAYUSERT');
  if (res) {
    ApiService.setAccessToken(res.access_token);
    return true;
  }
  return false;
};

const checkIfLoggedIn = () => {
  if (!isLoggedIn) {
    logout();
  }
};

export default {
  isLoggedIn,
  checkIfLoggedIn,
  logout,
};
