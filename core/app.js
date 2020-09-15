import express from 'express';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import envConfig from '../config/env';
import logger from './log';
import session from 'express-session';



const app = express();


if (envConfig.cors) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.send(200);
      //让options请求快速返回
    } else {
      next();
    }
  });
}


app.use(session({ secret: 'XASDASDA' }));

// view engine setup
app.set('views', envConfig.views);
app.set('view engine', envConfig.viewEngine);
app.set('port', parseInt(process.env.PORT || envConfig.port));

logger.forEach((log) => app.use(log))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(envConfig.static));

export default app;
