import axios from 'axios';

const URL = "http://localhost:7777"
const login = async(email, password) => {
    try {
       const response =  await axios.post(`${URL}/login`, {
            email,
            password
        });
        console.log({response});
        
        return response?.data;
    } catch (error) {
        throw new Error("Error in Login ", error);
        
    }

}

export const logoutAPI = async() => {
    try {
       const response =  await axios.post(`${URL}/logout`);
        console.log({response});
        
        return response?.data;
    } catch (error) {
        throw new Error("Error in Logout ", error);
        
    }

}

export const getUser = async()=> {
    try {
        const response = axios.get(URL+'/profile/view');
        return (await response).data;
    } catch (error) {
        throw new Error("Error in fetch user", error);
    }
}



export default login