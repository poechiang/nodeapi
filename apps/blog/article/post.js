
import { Db } from '../../../core/database';
export const method = 'post';
export default ( req, res, next ) => {
    let { id, title, catagory, tags, content } = req.body

    let cata = Db.table( 'catatory' ).get( `title = "${catagory}"` )
    Db.table( 'article' ).append( params );
    res.send( { code: 200, msg: 'Success', exrat: params } );

}
