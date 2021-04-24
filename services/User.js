import ApiService from './Api';

const getMe = async () => {
  const res = await ApiService.get(`oauth/me`);
  return res;
};

const update = async (id, data) => {
  const res = await ApiService.patch(`user/${id}?_format=json`, data);
  return res;
};

export default {
  getMe,
  update,
};
