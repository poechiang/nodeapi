export const method = 'get';
export default (req,res,next)=>{
    let params = req.query

    res.json(params);

}