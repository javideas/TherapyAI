require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

const router = require('./config/routes.config');
app.use(router);

const port = 5000;

app.listen(port, () => console.info(`app listening at port ${port}`));