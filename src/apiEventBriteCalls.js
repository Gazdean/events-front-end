async function fetchEventbriteCategories() {
    const url = 'https://www.eventbriteapi.com/v3/categories/';
    const token = 'O6J4GAGNK2FVHU6X3K5R';  // Replace with your actual OAuth token
  
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