import axios from 'axios';

axios
  .get('https://json.geoiplookup.io/')
  .then((res) => {
    console.log('Browser GEO status:', res.status);
    console.log('Browser GEO data:', res.data);
  })
  .catch((err) => {
    console.error('Browser GEO error:', err.message);
  });