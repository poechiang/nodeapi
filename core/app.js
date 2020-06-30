import express from 'express';
import config from '../config/index'


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', config.views);
app.set('view engine', config.viewEngine);

app.use(logger(config.mode));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.static));



export default app;

