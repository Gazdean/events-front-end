import axios from "axios";

const unsplashToken = import.meta.env.VITE_UNSPLASH_API_KEY

async function fetchUnsplashImage() {
  const url = 'https://www.eventbriteapi.com/v3/categories/';
  const headers = {
    'Authorization': `Bearer ${eventbriteToken}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}