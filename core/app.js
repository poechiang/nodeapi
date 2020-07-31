import express from 'express';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';

import config from '../config/index';
import { is,Console } from '../lib/util';

const PROJ_ROOT = '.';

const app = express();


if (config.cors){
    app.all('*',function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method === 'OPTIONS') {
            res.send(200); /让options请求快速返回/
        }
        else {
            next();
        }
    });
}




const port = parseInt(process.env.PORT || config.port || '10000')

// view engine setup
app.set('views', config.views);
app.set('view engine', config.viewEngine);
app.set('port', port );

config.log.forEach((item,key)=>{
    
    if(key==='morgan'){
        let morgan = require(key),stream;
        
        if(item.enabled){
            if(item.out==='file'||is.array(item.out) && item.out.contains('file')){
                
                if(item.rotator){
                    
                    stream = require('file-stream-rotator').getStream({
                        date_format: 'YYYY_MM_DD',
                        filename: path.resolve(PROJ_ROOT,item.file, 'http_%DATE%.log'),
                        frequency: 'daily',
                        verbose: false
                      })
                }
                else{
                    stream = fs.createWriteStream(path.resolve(PROJ_ROOT, item.file,'http.log'), {flags: 'a'})
                }
                
                app.use(morgan(item.format, {stream}));
            }
            if((item.out==='database'||is.array(item.out)&&item.out.contains('database')) && is.function(item.database)){
                app.use(morgan(item.format,{stream:{write:item.database}}));
            }
            if(item.out==='std' || is.array(item.out) && item.out.contains('std')){
                app.use(morgan(item.format));
            }
        }
    }
    
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.static));

export {port}
export default app;

