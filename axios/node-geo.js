const axios = require('axios');

axios
  .get('https://json.geoiplookup.io/')
  .then((res) => {
    console.log('Node GEO status:', res.status);
    console.log('Node GEO data:', res.data);
  })
  .catch((err) => {
    console.error('Node GEO error:', err.message);
  });