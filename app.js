const AppError = require('./utilis/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const authorRouter = require('./routes/authorRoutes');
const morgan = require('morgan')
const express = require("express")

const app = express();
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});



//All ROUTES
app.use('/api/v2/books', bookRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/authors', authorRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
  app.use(globalErrorHandler);

module.exports = app