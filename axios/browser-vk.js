import axios from 'axios';

axios
  .get('https://vk.com')
  .then((res) => {
    console.log('Browser VK status:', res.status);
  })
  .catch((err) => {
    console.error('Browser VK error:', err.message);
  });