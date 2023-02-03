import axios from 'axios';

// import { toast } from 'react-toastify';
const BASE_URL = `https://pixabay.com/api/?`;

async function imageAPI(inputValue, currentPage, picturesPerPage, updateState) {
  const axiosOptions = {
    params: {
      key: '30549938-651b5d539a57bc16112485a48',
      q: inputValue,
      image_type: 'photo',
      page: currentPage,
      orientation: 'horizontal',
      per_page: picturesPerPage,
      safesearch: true,
      editors_choice: true,
    },
  };

  const { data, status } = await axios.get(BASE_URL, axiosOptions);

  if (status !== 200 || data.totalHits === 0) {
    throw new Error(
      `Sorry, there are no pictures for the "${inputValue}". Please try again.`
    );
  } else return data;
}

export default imageAPI;
