import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmNmY5NmRlZWVkMjYwZDRlMmUyZDhhMGVlZGVlNzEwODMzOGIyMDc5MTI2ODcyNWRlNjUxNjJmMTYwMGNmMzQ3NGVkZjc2NGE2MWI2MGI2In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiI3ZjZmOTZkZWVlZDI2MGQ0ZTJlMmQ4YTBlZWRlZTcxMDgzMzhiMjA3OTEyNjg3MjVkZTY1MTYyZjE2MDBjZjM0NzRlZGY3NjRhNjFiNjBiNiIsImlhdCI6MTYyMTk5NTAzNiwibmJmIjoxNjIxOTk1MDM2LCJleHAiOjE2MjIwODE0MzYsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.NhvbvzA9LQ1Er6_E4DGvtQ84xvgNbB3VO-f2vGw6SUCiPBuwE2seVNy1VLxC9d7-HmXmuPN-gtuVHZXNmu2iwZytnwAiegfQ0lZgJxi4DrgIyD_MUAsCXyIwB0aYh9ByKgRHwZ5rYhSPZUQeZ3cTJtap0zy2eSvwzJraXhgNeSsarMF0MwoXr2fmpleSFailNgmMDt37PphFNXRuv1MrAUI-xa31jFwthWunY569uFD1cHSz3_29zPEOYnAK60xo3EwnBNbyooQAvYgxtbyZ5JPjORSypv3P2e_5e4gFUjDj18yMymhIgTXnZkdExRKb7j80K-77Ga2SCA5xxkZMzPnu4ZRYWB51zIXahB76EHwhJO0CzZ8BVwY9dtGuCgyliEJmXcj-Bz9NjGa5Ibr94kNEFNGKLsETSifyqvc-eCZiUblvgmgX3hxR9iBDCHHjaYQ4yLbKp4NaL8O2uBIWjELrVpmwlppliMP41hrjTFa0l3x0u4k2b7MlW10nWnor6twH33Ec3ByYEiRHiSpt8CWzhgVlxKs4DuObFtR4bvnsebW6AcWq9vplxC0xHvQI3nN8DZn3Auxaz-lgZ0BRHMwc82Wu_thp65fJtAVOxZOJ-F3zpJWfKO0-2m3Z87825KUOUxAiYCtAJKpL1sNu8auMbNAp4Vjuc4kC5B_kzP8'
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