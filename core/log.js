import path from 'path';
import log from '../config/log';


import is from '@poech/type-is';

const PROJ_ROOT = '.'
let loggers = [];
log.forEach((item, key) => {

  if (key === 'morgan') {
    let morgan = require(key),
      stream;

    if (item.enabled) {
      if (item.out === 'file' || is.array(item.out) && item.out.contains('file')) {

        if (item.rotator) {

          stream = require('file-stream-rotator').getStream({
            date_format: 'YYYY_MM_DD',
            filename: path.resolve(PROJ_ROOT, item.file, 'http_%DATE%.log'),
            frequency: 'daily',
            verbose: false
          })
        } else {
          stream = fs.createWriteStream(path.resolve(PROJ_ROOT, item.file, 'http.log'), { flags: 'a' })
        }

        loggers.push(morgan(item.format, { stream }));
      }
      if ((item.out === 'database' || is.array(item.out) && item.out.contains('database')) && is.function(item.database)) {
        loggers.push(morgan(item.format, { stream: { write: item.database } }));
      }
      if (item.out === 'std' || is.array(item.out) && item.out.contains('std')) {
        loggers.push(morgan(item.format));
      }
    }
  }

})

export default loggers;
