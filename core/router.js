import express from 'express';
import { statSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import util from 'util';
import config from '../config/index';


const root = resolve(join(config.app || 'apps'))
const charset = config.charset || 'utf-8'

const build = (file) => {
  let blob = require(file);
  let path = file.replace(root, '').replace(/\\/g, '/');
  let lastDotIndex = path.lastIndexOf('.');
  if (lastDotIndex > 0) {
    path = path.substring(0, lastDotIndex);
  }
  blob.url = blob.url || path;
  blob.method = blob.method || 'all';

  return blob;

}
const scan = (path) => {
  let blobs = []
  let files = readdirSync(path, charset);
  (files || []).map((file) => {
    let fpath = join(path, file);
    let stat = statSync(fpath);
    if (stat.isFile()) {
      blobs = [...blobs, build(fpath)];

    } else if (stat.isDirectory()) {
      blobs = [...blobs, ...scan(fpath)];
    }
  })
  return blobs;
}

let router = express.Router();


let infos = scan(root);
let routerMap = {};
(infos || []).map((info) => {
  // let url = info.url.replace(/\/index/g, '') || '/';
  // console.log(info.method, url)
  routerMap[info.router || info.url] = info.url;
  router[info.method](info.router || info.url, info.default)
})

export { routerMap }

export default router;
