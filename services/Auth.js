import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRhYzNlYzgwMGYxNTFiY2Y3YjQyNjFiNDBhYzhkY2E5MjY4MzA1MTQ5OGU1Y2IzYTlkMGQ5YmZhMWZmODBhYzU3Y2VkOTU5YTg5ZmZjMWIwIn0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiJkYWMzZWM4MDBmMTUxYmNmN2I0MjYxYjQwYWM4ZGNhOTI2ODMwNTE0OThlNWNiM2E5ZDBkOWJmYTFmZjgwYWM1N2NlZDk1OWE4OWZmYzFiMCIsImlhdCI6MTYyMzI4MjEzMSwibmJmIjoxNjIzMjgyMTMxLCJleHAiOjE2MjMzNjg1MzEsInN1YiI6IjE0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.Et1sqqCwzXRoKfFdVTVofgNCYHpWc7XlYvaaxmSSkmJCoKU9OT2PmZpp5QEnBmyPSpX5tFYTQ9Umw7fpj9LFo5ivcxXVbsH9XBqJeHTMuWu40KjUf1Bj89EW0Zp5eNavEa1X6-3Hm_rwX5xlJ3RSXQeGOVfG84CxWWxEAKGHFLVABW7FfHe_uKzoU_DK-YJFHJYPWP1FovzHKg2D5lAzuU1b9t0IH_eM9xuDONWFdxsZ86_R0eBHmOPvV8iHbQK57ntcdPDwvY3B-e_JI4gVOpCRpPsIJv2ftrnE1PI_mra3RfosR09jP5IjYO-rlBfDf3rrqp2aj6hX1n84NOrM6RgJ-vLfQzUepGrRNKwEOGUt2oqcVsAn_31_7v3Vc96xLxU-74qvqDa3nM9DYnmVB75eZwkIcx--TStQoLUP_bsmiS0GR7YEN79-maND_PwR3gjwsDghBggm3wBRKI_W9p_oI6SVlBwTVVuKWirbw5-cAsy7sryUAUE5nH9PqashmtvCd7zdO7ZUuQGZmUEhXosM7fMyt8Co3ijLUzRr0m7bFrIZ_1OCfiWCo-nyJODk12MV7jqLO6FBmzy6d7AGEY69wvrsTgjDE2j9yncndPrE10PIK0Fzce5h9rtEcIAba78kLaL7sB_Fu9P4fylFxq1wp823QJoFa7ORnTesChM'
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