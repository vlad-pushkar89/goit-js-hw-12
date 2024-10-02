import axios from 'axios';

const API_KEY = '46287903-5c8c629b6ba927f49057e3500';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
