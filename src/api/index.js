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

export const updateProfile = async (data) => {
  try {
    const response = axios.patch(URL + '/profile/edit', data, { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in update', error);
  }
};

export const getConnections = async () => {
  try {
    const response = axios.get(URL + '/user/connections', { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in fetching connections', error);
  }
};

export const getRequests = async () => {
  try {
    const response = axios.get(URL + '/user/requests', { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in fetching requests', error);
  }
};

export const acceptRequest = async (requestId) => {
  try {
    const response = axios.post(URL + `/request/review/accepted/${requestId}`, {}, { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in accepting request', error);
  }
};

export const rejectRequest = async (requestId) => {
  try {
    const response = axios.post(URL + `/user/requests/${requestId}/reject`, {}, { withCredentials: true });
    return (await response).data;
  } catch (error) {
    throw new Error('Error in rejecting request', error);
  }
};

export default login;
