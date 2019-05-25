const express = require('express');
const bodyParser = require('body-parser');

const config = require('./system/core/config/main');
const router=require('./routes/router')

const ejs = require('ejs')
const app = express();



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(router)
app.use('/upload', router);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.port, () => console.log(`Server running on ${config.host}${config.port}`));

