const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const error = require('./middleware/error');
const courses = require('./routes/courses');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' }); 
// winston.add(winston.transports.MongoDB, { 
//     db: 'mongodb://localhost/nodeex2',
//     level: 'info'
// }); 

// throw new Error('Something went wrong')

mongoose.connect("mongodb://localhost/nodeex2")
    .then(() => console.log("DB Connected...."))
    .catch(err => console.log(" Not Connected to DB....", err.message));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use('/course', courses);
app.use(error);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}....`));