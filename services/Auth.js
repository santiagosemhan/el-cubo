import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBjMzJkOWVhYTFjNjViZDk4MmZmOTVlMzc2MmQ2NGJkZWRhNjkxODg4NmM4NzA2MjljYjc5MWNhMTk5MzI5YTlhMzVlZDEwMzM4ZDYyNmZmIn0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiIwYzMyZDllYWExYzY1YmQ5ODJmZjk1ZTM3NjJkNjRiZGVkYTY5MTg4ODZjODcwNjI5Y2I3OTFjYTE5OTMyOWE5YTM1ZWQxMDMzOGQ2MjZmZiIsImlhdCI6MTYyMjgxODE3MCwibmJmIjoxNjIyODE4MTcwLCJleHAiOjE2MjI5MDQ1NzAsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.gNsP7HEUSrkbgWrOmhjDNdDlmmyqKwhv1jmPgfu2Q548oAJJsYkIHAfWnHPE7FMyvONqkHAcbxrWsW8l4VJ60PLJh4WbkO9KcA3gVeJskHjxPPr4FZeH3jagHw8u_5kwj-lGb53ovBJ1aJyoYmd_hhHlQSoBqqpD4BNOWRbSaLkSqQOdH0KJTW0NjN5coJw26jDU7xrc4XDIDslCxyMIiTb04uCDdZ0CMDZ8KPXyoUtimG4Nf1YOvB3g8IQTXWHrII0Giw_QCRBvtfw5gRLoWC8HcIm9cVliRmyl7kRouTkH3eEwh4NDX3dEC0iYwSZH7EMdHyYvkAJ1QOPQKSyuYlQ_nNcoChQEdLhhnGU_2VtD_51Ups5ehlsXydZDcyjAw3Gd-T47bRRlhoLkh96UUuloaMq6aQqfOkkIquoiOtd0BeK4Yzgsh0tsFztOLTigSfN4uN2kWWfre8qaaKPxWSAEZmLDDu3gsvQx65uXtY-dpjgUDWa8d-RYyUFbw-QhI2EnWQyUu7BsyxJPwW7q6IAfvwwWbC5PLBT4HlVgiX1zkHoos36xZdKXcfXb-czaBiUV5GuazHdyzKxUO4jCLC1ijX-qNa5fhxoxu7pEdfZ5WwJJv-p0nx08yxeeu-BVBtSwuYG5ileW5KpI6DEO5Ytp6h1XGlMsgIdCJfMo-t8'
  };

  try {
    //const res = Cookies.get('RTVCPLAYUSERT');
    //const resJSON = res ? JSON.parse(res) : null;
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