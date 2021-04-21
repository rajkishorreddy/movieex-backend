const cors = require('cors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const userRouter = require('./Routes/userRouter');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

app.use(cors());

//for reading static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(xss());
//for parsing data
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.requestTime);
//   next();
// });

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:']
    }
  })
);
app.get('/', (req, res) => {
  res.send('HELLO FROM MOVIEEX API');
});
app.use('/api/users', userRouter);

app.use(globalErrorHandler);
module.exports = app;
