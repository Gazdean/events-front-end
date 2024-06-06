import axios from "axios";

const unsplashToken = import.meta.env.VITE_UNSPLASH_API_KEY
const baseUrl = 'https://api.unsplash.com/'
const collectionId = 'huoJ2ZcVdNQ'

const fetchUnsplashCollection = async () => {
  try {
      const response = await axios.get(`${baseUrl}collections/${collectionId}/photos`, {
          params :{
            page: 1,
            per_page: 14
          },
          headers: {
              Authorization: `Client-ID ${unsplashToken}`
          }
      });
      console.log(response.data)
      return response.data;
  } catch (error) {
      throw error
  }
};

export {fetchUnsplashCollection}