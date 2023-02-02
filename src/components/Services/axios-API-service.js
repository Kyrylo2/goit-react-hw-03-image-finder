import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/?`;

async function imageAPI(inputValue, currentPage) {
  const axiosOptions = {
    params: {
      key: '30549938-651b5d539a57bc16112485a48',
      q: inputValue,
      image_type: 'photo',
      page: currentPage,
      orientation: 'horizontal',
      per_page: 12,
      safesearch: true,
      editors_choice: true,
    },
  };

  return await axios.get(BASE_URL, axiosOptions);
}

export default imageAPI;
