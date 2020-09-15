import { join } from 'path';
import database from './database';
export { database };

export default {
  views: join(__dirname, '../public'),
  static: join(__dirname, '../public'),
  viewEngine: 'jade',
  cors: true
}
