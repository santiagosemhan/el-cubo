import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJiNjRkYTk4NmMyNzVmNjI2MGUzZDI3YmM0OTBjN2VjY2I1ODY2ZmJkMGJhMzgwNDkyMGU5NDAzZTFiNWEyZTZkNmMxOWIwYzdlMGY2OTM0In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiJiYjY0ZGE5ODZjMjc1ZjYyNjBlM2QyN2JjNDkwYzdlY2NiNTg2NmZiZDBiYTM4MDQ5MjBlOTQwM2UxYjVhMmU2ZDZjMTliMGM3ZTBmNjkzNCIsImlhdCI6MTYyMjczMTUwNCwibmJmIjoxNjIyNzMxNTA0LCJleHAiOjE2MjI4MTc5MDQsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.ijjHS38mspWksAjgKAgWTc7S9ZpoCAFFSB8Chn5rnU4ZFN__B652OkH1HlTJ-99oPvCgUaPqJUleqMAn8CdqMxcdoim1bKpp4hHiuN_u8jjdm8no2R4vseVvzFyqRAXnMHR5QL0NZgIYYCOe2TKVj_VuHJU0cdFV3i_k6-_gZpppaFwM1hSMFoyemEUTXHjRGUyg8RJ3unQ9XGAhU4-g39GJBhFFM2TvtDYvfW3gpnGzdQp_XnP5moROLWtwinR1lpLRMa_UfirlS-Md7qquXCmnQKh-anbs3AQfFqlwGhno1XwMq0KtQY-TREGJpoSTxILdL2-87kvfgwQhQVnbQv5O7uiCQU-lRXpwg-QuRugtkzoRFCHT9Q1_PkDP5veEELKFjBQatMQ_s6Eg3ozI-ZQnoirdIFMPlwkx7eTyoYgfnAfwj-ovoVR89_7Srx5ntM1KAO75yFmxA2VOU4jDk5umgC4nGt9qffmF1-Gz0NEhf-_BgChpcnCtrf1mXV85BplJyY568xOV82MS4CHPJpz_C4JBn8k4HyGi77G8kra4FpH0rwELbsLYXJMwHGN2bmpuerXNKvX6jo3nd58XVn-RUoCb0iyBkDCnoyjuUahI1Z9M6k2aYHVxRvtNGkoIYcXeoDy9WM2q-qVIGplLE65nkYfWTDAZ2U49IUWIwx0'
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