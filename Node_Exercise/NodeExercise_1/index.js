// const appjs = require('./app');
const home = require('./routes/home');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/user', home);
// app.use(appjs);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... \nVisit http://localhost:${port}/`));