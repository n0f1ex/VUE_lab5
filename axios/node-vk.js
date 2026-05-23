const axios = require('axios');

axios
  .get('https://vk.com')
  .then((res) => {
    console.log('Node VK status:', res.status);
    console.log('Node VK content-type:', res.headers['content-type']);
  })
  .catch((err) => {
    console.error('Node VK error:', err.message);
  });