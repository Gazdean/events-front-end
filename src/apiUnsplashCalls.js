import axios from "axios";

const unsplashToken = import.meta.env.VITE_UNSPLASH_API_KEY
const baseUrl = 'https://api.unsplash.com/'
const collectionId = '001scadf0vU'

const fetchUnsplashCollection = async () => {
  console.log('called images')
  try {
      const response = await axios.get(`${baseUrl}collections/${collectionId}/photos`, {
          params :{
            page: 1,
            per_page: 20
          },
          headers: {
              Authorization: `Client-ID ${unsplashToken}`
          }
      });
      console.log(response.data)
      return response.data;
  } catch (error) {
      console.log("Error fetching images", error)
      throw error
  }
};

export {fetchUnsplashCollection}