import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ4ZmZiMjkzZTBjY2U1YjBhNjk0YjUzNDQ1NGEyM2Y1NjJkZWIyMzllNmM0NGRiOWIzMTU2MGJjOTlkMDYyNzMxMzVhOTYxYTU0NzAzYTg4In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiJkOGZmYjI5M2UwY2NlNWIwYTY5NGI1MzQ0NTRhMjNmNTYyZGViMjM5ZTZjNDRkYjliMzE1NjBiYzk5ZDA2MjczMTM1YTk2MWE1NDcwM2E4OCIsImlhdCI6MTYyMzcwOTcyNSwibmJmIjoxNjIzNzA5NzI1LCJleHAiOjE2MjM3OTYxMjUsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.fOue3Xbx2QuAWiHRuoYSmzHYheH7Lmf2H4wFtnflXSiqV3s9UQJY0oaJoDg4TI5Y6RoN2Jv2qEUxWEyE5hsm3g4xkjUzdoVQw8jVJB8OD49dzVq52D9hb1usqyeK7-d7ExALTsZUOC23f1W3A-NlktImyG7mx5fqwIAl3gntKzq1cVOrz3hll8vQKySCOQoaq0OKUoALkt0SvAx-5Jem0H6ZhXmG-62UlVSlpo0wOxeqbRI7yPVi8Khna3WMY60oq5AMOC-aMqeO6T93O9dKpQYiToTFFmQ147bdQ0QbyTtULdqUbhGd43PHBv4ppKpd4doJbgFl41nS-7FPIbXvQ55Nz4ps3cgFdqo3hwrB09sWuGknsCv1QZ7Mg-KoAl5p2Qdy1cQUHDCbtt7t8dgoTAihAud6UbXgN6CVV6BGiugduPdp8-ZjmIjhbEZHWZwZAJiQuQM6qF1bhO1HNndGwu32AFzuny1ZZoxd22hvKfHZFoyKs9ieEuw_6599Pp4PLJsTEVqrPNhKAXCLLbxcPIxcdxfBJYFMcR3gUL1faQ7RFC-mUZTIy9iQ07Q2NKhRutjVOysSAjEKE26A2-9hOP1PIlb8twy9PdSvSoeQxdBwFdo9P8SrqC-zEnm_sVDSOw-SJ61z26gK4aGlFaslQgnT8Bbc4n8piFusjq667ok'
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