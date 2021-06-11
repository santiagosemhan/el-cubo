import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQzZTcyYmMyMWRkNThiYWU0MTgzYmE0N2JhNWJhNDI4YmZjNTBhMjNmYmRkMTQ1YWNhMjU1YWFjMWZiN2Y0Mzc1OWJmYzBjMmRjNGQ4YmFhIn0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiI0M2U3MmJjMjFkZDU4YmFlNDE4M2JhNDdiYTViYTQyOGJmYzUwYTIzZmJkZDE0NWFjYTI1NWFhYzFmYjdmNDM3NTliZmMwYzJkYzRkOGJhYSIsImlhdCI6MTYyMzM2OTg5MywibmJmIjoxNjIzMzY5ODkzLCJleHAiOjE2MjM0NTYyOTMsInN1YiI6IjM0MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.CFrq0kWLgb-0Vh5NH4Inj3aGa6hx-TijpCFtbNrvY7tpO87-xnfIFm-8J9wsG0F5jzdcOFRa7uh8QKLrnhdMV4VWKd0F5geIVrTJ3qhxwA4oG3pI-5zgnv9slSBVfB47g9cPY1xblsxxrbhGmBf04Oi63Bq1VhVLIgiRsJhtrUsdn4O_gJUFC8bnyZ1WnGyoN8L2jCt6sLMg9Ban8zDpBmchhrfQoi_GFyiEmWFNyea0byojv2tfgpfVK9-s41dJ6mz0tL3JBq-E60ocWR_wLoUJxD4kBPI-kvXb-7KYdrIJ7rVY9-mlJ0jZqNoVQ4qyaQ3Lh9agKkFVr0QYi-IPp1kqXVtKA1zVoxG29FslZzR46D1fNkixR3ijRhi0I39jIrWcKut919lKEDMoNeTu2VC55cV_RJnso6SyRKcrOUx3gA_oDgwXU64HKgneYjHuzdb67R8vyJ_4VAyQ75BOgF3Ml67n_bhHTipDT59dz74MbwzFnGNSfvivXpxKZKiW0vjhl3PlRqsLclTzEl0HvCyB_VMf9dX_FmGQdXEIMZk7cAqMrkNymF9WjqlAhfw6zzz8ObxfmQi97_7MzYw2y_IWXCmBE9HQ4OZN9kf5_jR9nvwSILkbC0OKEMc1JgPkY_xam45ypMuQTIx7rKk-ATMNrPV8Ejh7q2GhnBfSzaE'
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