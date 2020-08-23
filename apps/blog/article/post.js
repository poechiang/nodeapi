
import {Db} from '../../../core/database';
export const method = 'post';
export default (req,res,next)=>{
    let params = req.body
    Db.table('article').append(params);
    res.send({code:200,msg:'Success',exrat:params});

}
