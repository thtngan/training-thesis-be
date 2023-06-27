const { connect } = require('mongoose');
const { config } = require('dotenv'); 


module.exports = () => {
  config(); 
  const DB_URL = process.env.DATABASE_URL;
 
  connect(DB_URL,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => console.log('Connected DB Successfully'))
  .catch((err) => { 'Connected DB failed' + console.error(err); });
 
}