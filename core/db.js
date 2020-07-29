import {createConnection} from 'mysql';
import extend from 'extend';
import util,{Console,is} from '../lib/util';
import config from '../config/index';

const parseOption = (options)=>{
    if(!options){
        throw `[SQL] Missing argument options`;
    }
    if(util.is.string(options)){
        options = {where:options}
    }
    if(util.is.function(options)){
        options = {callback:options}
    }
    return options;
}
const parseTableName = ({tableName,alias}={})=>{
    if(!tableName){
        throw `[SQL] Missing Argument tableName`;
    }
    tableName = util.underline(tableName).replace(/^_/,'');
    if(alias){
        tableName = `${alias}_${tableName}`;
    }
    
    return tableName;
    
}
const Db = function(options){
    this.config = extend(config.database,options||{});
    this.options = {};
    this.connection = createConnection(this.config);
    return this;
}
Db.prototype.table = function(tname){
    this.options.tableName = tname;
    return this;
}
Db.prototype.where = function(...args){

    this.options.where = args;
    return this;
}
Db.prototype.join = function (tables){
    this.options.join = tables;
    return this;
}
Db.prototype.fields = function(fields){
    if(util.is.string(fields)){
        fields = fields.split(/[,\s]+/).filter((item)=>(item));
    }
    if(util.is.array(fields)){
        fields = fields.join(',');
    }
    this.options.fields = fields||'*';
    return this;
}
Db.prototype.all = function (options) {
    if(!options){
        throw '[SQL] Missed argument ( options ) of method ( Db.all )';
    }
    if(is.function(options)){
        options={success:options}
    }
    let {success,error,...opts} = options;
    options = extend(this.options,parseOption(opts||{}));
    let tname = parseTableName(this.options);

    let fields=this.options.fields||'*'
    let where = this.options.where;
    where = where? `WHERE ${where||'1'}`:''
    let sql = `SELECT ${fields} FROM ${tname} ${where}`
    
    this.connection.query(sql,(err,rows)=>{
        if (err){
            err.msg = '[SQL] query operator failure!';
            error && error(err)
            Console.info(err.msg);
        }
        else{
            success && success(rows)
        }
        
    })
}
global.db = (options)=>(new Db(options));
export default Db;