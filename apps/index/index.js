import Db from '../../core/db';
import config from '../../config/index';

export default (req, res, next) => {

  let db = new Db(config.database)
  db.table('user').all()



  res.render('index', { title: 'Express' });
}