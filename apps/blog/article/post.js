export const method = 'post';
export default (req,res,next)=>{
    let params = req.body
    
    res.send(params);

}