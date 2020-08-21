import {createConnection} from 'mysql';
import extend from 'extend';
import config from '../config/index';
import util,{Console} from '../lib/util';

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
    this.config = options;
    this.options = {};
    this.connection = createConnection(options);
    return this;
}
Db.prototype.table = function(tname){
    this.options.tableName = tname;
    return this;
}
Db.table = function(tname){
    return (new Db()).table(tname)
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
    this.options.fields = fields;
    return this;
}
Db.prototype.all = function (condi) {
    return new Promise((resolve,reject)=>{
        let tname = parseTableName(options);
        let fields = this.options.tableName;
        let where;
        if(typeof condi = 'string'){
            where = condi
        }
        else if (typeof condi==='number') {
            where = `${this.options.pk||'id'}=${condi}`
        }
        else if(
            where = condi.map((item)=>{
                if(typeof item = 'string'){
                    return item;
                }
                else if (typeof item==='number') {
                    return `${this.options.pk||'id'}=${item}`
                }
            }).join(' OR ')
        )
        where = where? `WHERE ${where}`:''
        let sql = `SELECT ${fields} FROM ${tname} ${where}`
        this.connection.connect((err)=>{
            if(err) {
                return reject('sql connect failure!');
            }
            this.connection.query(sql,(err,result)=>{
                if(err) {
                    return reject('sql connect failure!');
                }
                return resolve({result,sql})
            })

        })
    })
    
}
Db.prototype.append = async function(data){

    return new Promise((resolve,reject)=>{

        let tname = parseTableName(options);
        let fields = this.options.fields;

        let sql;
        if(Array.isArray(data)){
            sql = `INSERT INTO ${{tname}} (${fields || ...columns}) VALUES ?`
        }
        else if (typeof data === object) {
            let columns=[],values=[];
            for(let col in data){
                columns.push(col)
                values.push(data[col])
            }
            sql = `INSERT INTO ${{tname}} (${...columns}) VALUES (${...values})`
        }
        else {
            reject('invalid data format')
        }

        const cb = (err,result)=>{
            if(err) {
                return reject('sql connect failure!');
            }
            return resolve({result,sql})
        }

        this.connection.connect((err)=>{
            if(err) {
                return reject('sql connect failure!');
            }

            Console.info('sql connect success');

            if(Array.isArray(data)){
                this.connection.query(sql, values,cb)
            }
            else if (typeof data === object) {
                this.connection.query(sql,cb)
            }

        })
        Console.log(sql)
    })
    
}
export {Db};
export const db=(tname)=>(Db.table(tname))
export default {Db,db};

