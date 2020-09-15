import { join } from 'path';
export default {
  mode: 'dev',
  app: join(__dirname, '../apps'),
  port: 10000,
  views: join(__dirname, '../public'),
  static: join(__dirname, '../public'),
  viewEngine: 'jade',
  cors: true
}
