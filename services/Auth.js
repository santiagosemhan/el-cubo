import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmNTQ5MjYwMzY4NDZhYjlhZjJkOWE1N2U0NzcxMzM2MjM3OTBkNTBjZGZiZjAxYTk4MTg0Y2ZhYmM5ZjcxMjQ5YTRkNTVmYjhiNTVlMjhlIn0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiI5ZjU0OTI2MDM2ODQ2YWI5YWYyZDlhNTdlNDc3MTMzNjIzNzkwZDUwY2RmYmYwMWE5ODE4NGNmYWJjOWY3MTI0OWE0ZDU1ZmI4YjU1ZTI4ZSIsImlhdCI6MTYyMzE5MjE0MSwibmJmIjoxNjIzMTkyMTQxLCJleHAiOjE2MjMyNzg1NDEsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.j_CmzG9PQTeQqZXoapkunnflyWfY4BzvlbZ-v0k9NvfQYlCs0vOBaTbEH1QABwbjNK4LwUsQ1XufXAbrgv7YGCJ8UhgcwzYJLiDkiMnymH_jh2GrQI4c59SvehX30llD6xtT8ovodM2Ve5Cih7T8osmpwlU9KBTxexIY5ympc6tKpIACd19h6RoPXN-lMKRvwZXmwQGrycKvvka2HAFags0ffJl-pKKe-U34fPJ1btTEPWio4GYtbZgF-9sFsru7VrzRXiHRRjO4E0h9V-TRoaUomJSYEhrIvRIk6B5mbdYiajTC13hsrNKMrcSAAYVhZHUex00iKvH8-Xc0dXbBUDH9_HcgVi2GbzFI-3AgBN68mFiDiehOIPFplkcSZf3rtRPzDq8FJvkkGGxsVGQqKbdqL5eBss1th8BdwBL3Szx_3j5cplVEmrpvSLNJn03YBJVfESyTipX79BZS1qPg5KnupPNwVo-Nge-apREwxlzF2oEn1nSVF3W7KzAZS1f-BB5V3U_yyXJ9-biOlNWGM-vOORwt6NJ3uKkfXEZaiYi_OFd2abVSp17MRYTHQUh7J-dQClF6Gh-axLEqd5qSlmpcKFpD0hwe-du20kDCkJojtIfrTtLIKiNysa3P8tQJ0HL2lEvCBGbMkQjp-xrRUY3rp743g1LfQAjhnaXUP8g'
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