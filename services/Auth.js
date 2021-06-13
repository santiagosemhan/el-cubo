import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4YTAzMmY3ZTk5YjQ4MDBlM2FlMmU1YzFkODlmY2Y3MGQxMmZkZjUxNDFjZWNlMjc1ZTAzODg2OWUwODEyNzk4NGEyNTNlN2M1NTE3NmY5In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiI1OGEwMzJmN2U5OWI0ODAwZTNhZTJlNWMxZDg5ZmNmNzBkMTJmZGY1MTQxY2VjZTI3NWUwMzg4NjllMDgxMjc5ODRhMjUzZTdjNTUxNzZmOSIsImlhdCI6MTYyMzYyNzE2MywibmJmIjoxNjIzNjI3MTYzLCJleHAiOjE2MjM3MTM1NjIsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.L9fHe-gEpKgWU-Na4XKzLmlRhiQV4fTBsa0IUqKThSwdZpVkfa3OwtUySMHL6zTP5R_bBtzq1Rsss2BlpXxTjn-48eqMbRittjcvy5jg3rGMMUM-0zyzxJab1XkvHbkilN1lz6qi9TURYW8IkOid06ZEqR3LeMQSO0JD0A_PcDbVbkrmLM03zqRv91Yj9VUSAzAkU4DD2qpcsIN2ARfdxiRlseCIaks1VNhFsnyDwwCOwDDobdV1YTFiBz-phIf8BDZ8E5lTE6e9Ru4rPoEksW6JyrgMHlxxJkUdCJiB4gIXzH2RrSnOJy7NwyiGNnez5xOAjxWtFCTiG-gqhDwgxPpHdHa2NH9dqvaEmuk7BHyLLY4TuB3vNfvnFRjVorrHPVViZTtc3KKnsQJzpIUmwfViSgRbbR9-2uDBIrF0yZZfINy5hhkPmI0C7VZKsW5gzGXvvxlNwWnEOMJBGFDzEQWamIKosYEW9HtvtZl_LYqT0XImieWp-acvawJDuTXXubC9-WkDYKHO0OtcMmRVPU5q5XGG34MtO97eHi3eIMaQM5VSnEmbZhXiw2y_CPdjBl_FnUBmApElgmxymsZ4r2wIctk3xy9aSX3-Pi9uPQdpyXOCiTnIQ7F-0-vQ0JELITzgujx0PHQ98PXJcdHNrmNx-Gs-MnVZiu5NQCNDYMc'
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