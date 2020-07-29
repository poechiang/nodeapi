import { Console } from "../../../lib/util";


export const method = 'get';
export default (req,res)=>{
    
    const DB = global.db({database:'blog',password:''})
    DB.table('article').all({
        success:(rows)=>{
            res.send(rows)
        },
        error:(err)=>{
            res.send( {code:400,msg:err.msg} )
        }
    })
    return 
    
    
}