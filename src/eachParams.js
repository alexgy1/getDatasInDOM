const URLS = require('../entry/urls.js');
const { getContent } = require('./ajax');
URLS.forEach((url) => getContent(url));
