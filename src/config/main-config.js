require('dotenv').config();
const path = require('path');
const pagesFolder = path.join(__dirname, '..', 'pages');


module.exports = {
  init(app, express){
    app.set('views', pagesFolder);
    app.set('views engine', 'react');
  }
};