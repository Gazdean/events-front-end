const token = import.meta.env.VITE_EVENTBRITE_TOKEN; 
const url = 'https://www.eventbriteapi.com/v3/categories/'

async function fetchEventbriteCategories() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error( error, 'Error fetching categories:')
    }
  }
  
  export { fetchEventbriteCategories }