import express from 'express';
import {statSync, readdirSync} from 'fs';
import { resolve,join } from 'path';
import util from 'util';
import config from '../config/index';
import createError from 'http-errors';


const root = resolve(join(config.app||'apps'))
const charset = config.charset || 'utf-8'

const build = (file)=>{
    let blob = require(file);
    let path = file.replace(root,'').replace(/\\/g,'/');
    let lastDotIndex = path.lastIndexOf('.');
    if(lastDotIndex>0){
        path = path.substring(0,lastDotIndex);
    }
    blob.url = blob.url||path;
    blob.method = blob.method||'all';

    return blob;
    
}
const scan = (path)=>{
    let blobs = []
    let files = readdirSync(path,charset);    
    (files||[]).map((file)=>{
        let fpath = join(path,file);
        let stat = statSync(fpath);
        if(stat.isFile()){
            blobs = [...blobs,build(fpath)];
            
        }
        else if (stat.isDirectory()){
            blobs = [...blobs,...scan(fpath)];
        }
    })
    return blobs;
}

const load = (app)=>{
    let router = express.Router();
    let infos = scan(root);
    (infos||[]).map((info)=>{
        let url = info.url.replace(/\/index/g,'')||'/';
        console.log(info.method,url)
        router[info.method](url,info.default)
    })
    
    app.use('/',router)


    app.use(function(req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    
    });
}
export default {load}