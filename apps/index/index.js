import {Db} from '../../core/database';

import type from 'util';

export const method = 'post';

export default (req, res, next) => {

	// let db = new Db(config.database)
	// db.table('user').all()

	// res.render('index', { title: 'Express' });

	// let {id,title,catagory,tags,content} = req.body
	// console.log(req.body)
	// let cata = await Db.table('catatory').append({title:catagory});

	console.log(Object.values({a:1,b:2,e:3,c:4}))
	res.send({code:200,msg:'Success'});

}