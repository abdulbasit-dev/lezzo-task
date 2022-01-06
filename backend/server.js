const express = require('express');
require('dotenv').config();
const cors = require('cors')

const bodyParser = require('body-parser');

const storeRoutes = require('./routes/stores');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

//create app
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

//CORS hnadler
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

//routes
app.get('/', (req, res) => {
  res.send('I must get the job');
});

app.use('/api/stores', storeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);


// If no route found
app.use(function (req, res) {
  return response(res, 404, false, `Invalid endpoint : ${req.originalUrl}`);
});

//ERROR HANDLING MIDLLEWARE FUNCTION (HttpError class)
app.use((error, req, res, next) => {
  //we check if a response has aleardy sent or not
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred'});
});

//listen
app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is Running on port: ${port}`);
});
