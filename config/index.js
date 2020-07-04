import {join} from 'path';
import database from './database';
import log from './log';

export default {
    mode:'dev',
    app:join(__dirname, '../apps'),
    port:10000,
    views: join(__dirname, '../public'),
    static:join(__dirname,'../public'),
    viewEngine:'jade',
    log,
    database,
}