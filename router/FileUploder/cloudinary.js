const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dwbuzsbam',
  api_key: '433985565969323',
  api_secret: 'R6q8n_VpJEiV3Rj4Lec2SQS5LXA'
});

module.exports = cloudinary;