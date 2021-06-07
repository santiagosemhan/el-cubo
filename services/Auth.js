import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4YmNlN2E5YjdiNWE2ZGJmNWYyNjM4ZTk5MmI0OWUzMGQ2YWU0MmE5YjUxMmZjNTBlOWJlM2Y1NDQzNTI3NzNhMzc0ODBmM2ViYjVmN2U0In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiJlOGJjZTdhOWI3YjVhNmRiZjVmMjYzOGU5OTJiNDllMzBkNmFlNDJhOWI1MTJmYzUwZTliZTNmNTQ0MzUyNzczYTM3NDgwZjNlYmI1ZjdlNCIsImlhdCI6MTYyMzA5NjgxOSwibmJmIjoxNjIzMDk2ODE5LCJleHAiOjE2MjMxODMyMTgsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.pTUFQNBGXcmaECPRQqHJloXWmFIJ3fFYRFym__xXO8vb_2clOFTyKxeTW_a3e6nuaaPzJtNoHyFq9-5IBOwMF0ANcB7MeHdgduwqQh3_f3-mfJWeh1_7dxCO7aGixBO1IB8ki9tpjCYDYwfQbpefgDBzWOvtvFU7gdt_v4Gv3jOe73qXSOSbwM8OA3Dz-wQ26SD2ikCe3t2NIlhhh6GkmYHYMgd7NI3rm5icJzH0YAfRF8TopnFRsHfKAMHs-v9VgK3TgG_nYAJi6UjEs7PSy1Mons-cbNgkmuczwjQYVq3cwfsiZNv5acSuznbwcmSIVs0ghZeHIyEyZAwzYYLjOXBrsDZ6TndNEhuW6HBKTwglvyrE0sgTKQNWJlDact9SQLvMmR8z5NA2Qte6mhIyd2kf3JY8uuJL47DgaTfP6daETlFrXiwcwf3kDNwvbtg46FUe6cnKUjMYP18K5SeKwJGhEbx2qUWCo9gjWrFQCP0jhzsAyZvlJ7kZBzBGHGPwDh5gq6ZDF7h_y_tf81YFZnK77ffyP-MZpcTPXoGGSmf7Scp7aZInaSYfnXNoOBN9EG4QiJomwGZqHhOMGQCY9VdocFrT7-VOrmfJ2c69E2_kdJqYw1STMuyqVAKjUvZzI1MWmoHtfMLUKf4fepJot8JwL-lnv_pV25uUBjSvUGo'
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