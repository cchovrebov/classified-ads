import axios from 'axios'
const url = 'http://localhost:8080'

export const getPublishedPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/api/post/published`, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/api/post`, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getPost = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/api/post/${id}`, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}


export const createPost = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${url}/api/post`, payload, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const patchPost = async (id, payload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${url}/api/post/${id}`, payload, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const publishPost = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${url}/api/post/publish/${id}`, null, {
      headers: { token }
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}


