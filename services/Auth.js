import ApiService from 'services/Api';
import Cookies from 'js-cookie';

const isLoggedIn = () => {

  /*const resJSON = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA5OTg0ZWY2OTQwYTE3ODA4MmY0M2E2YWNhY2VlMDZmMmNhOWE1NjBkYmU1MGVlM2EzZGYxYWY5ZTBmMzA1YzhhZjg1ZjJkOTcyOGFkZGY0In0.eyJhdWQiOiIwMWJlMjQ2ZS0wMDdhLTQyNmQtYTdiYS03YTI5ZjBiZjdjZGQiLCJqdGkiOiIwOTk4NGVmNjk0MGExNzgwODJmNDNhNmFjYWNlZTA2ZjJjYTlhNTYwZGJlNTBlZTNhM2RmMWFmOWUwZjMwNWM4YWY4NWYyZDk3MjhhZGRmNCIsImlhdCI6MTYyMTM1NjIzOCwibmJmIjoxNjIxMzU2MjM4LCJleHAiOjE2MjE0NDI2MzgsInN1YiI6IjEyMCIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwid2ViX2NsaWVudCJdfQ.QOVNqEldwoM-w6RKUB39Ef_Y1IfPD0CzAY-tizvUTQc8xcqaCu0DJ0_F1A8dFh3WIcpLOLa2nFZC1R5zd3tYUVUgR0HADnWotATrnEh_aOteMc8p7WiXhZ3ABTlfUp0pw-MKoD-t3h-zvpKHqS1EGNKP9yC2B67rbDVssU6NopnzdqNBTxDmo3whIpaYVoY1noePadpAqIPM_7aNZTmWpSI5zX_Zx1cDSE3uFVN8eyYuiYVxW27QrTh5h0O9re3DLh_klCozKoFF68M7KNDpgJ_fP8mc598UUvJ0cjd4r988vWUXydhipgfDwCAcg8hwplJf8Y-Zc1mZMpNWQ7w9bKJi6GlDSm596FdNwycY7ADfOqFaZMGmST66DkrO4NQrOfonIKYa3ybzmbgWE16Wbu8A4AIUVXECu19kb5_RsGYRqDvw3MLSjZCAYHmpr239mYR9p0bzn7MbwlV9MNSAFMl6nvmYohQhT4n8mI764m_x-LUio3VGRH16CNhrKZOQhDqXDRVvn2BaSqy5EwfCAkS1rBzdlg3LoaaLaRiRR7iz4B9l0uUHLLisNfPhSDEF7e4dVKfAPHN6oCoawwoZfMEaCQ3Vnk5DjpCaUfmSx8xXAV4cwqotPDchmW8_aN6SgezH_9wNRWrnl0Yn48PDf6_zHngAI2oeIehy0B5qyWs'
  };*/
  try {
    const res = Cookies.get('RTVCPLAYUSERT');
    const resJSON = res ? JSON.parse(res) : null;
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