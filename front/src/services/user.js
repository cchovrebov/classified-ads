import axios from 'axios'
const url = 'http://localhost:8080'

export const signUpReq = async (payload) => {
  try {
    const response = await axios.post(`${url}/api/user`, payload);
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const signInReq = async (payload) => {
  try {
    const response = await axios.post(`${url}/api/auth/sign-in`, payload);
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}