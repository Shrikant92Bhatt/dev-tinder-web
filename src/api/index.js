import axios from 'axios';

const URL = 'http://localhost:7777';
const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log({ response });

    return response?.data;
  } catch (error) {
    throw new Error('Error in Login ', error);
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axios.post(`${URL}/logout`, { withCredentials: true });
    console.log({ response });

    return response?.data;
  } catch (error) {
    throw new Error('Error in Logout ', error);
  }
};

export const getUser = async () => {
  try {
    const response = axios.get(URL + '/profile/view', { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in fetch user', error);
  }
};

export const getFeed = async () => {
  try {
    const response = axios.get(URL + '/user/feed', { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in fetching feed', error);
  }
};
export default login;
