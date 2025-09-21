import axios from 'axios';

// The base URL for your backend API
const API_URL = 'http://localhost:5000/api/mastodon';

// Function to create a new session
export const createSession = async (sessionData) => {
  const response = await axios.post(`${API_URL}/session`, sessionData);
  return response.data;
};

// Function to like a session's Mastodon post
export const likeSession = async (postId) => {
  const response = await axios.post(`${API_URL}/like/${postId}`, {});
  return response.data;
};

// Function to comment on a session's Mastodon post
export const commentOnSession = async ({ postId, comment }) => {
  const response = await axios.post(`${API_URL}/comment/${postId}`, { comment });
  return response.data;
};