import { createConnection } from 'mysql';
import extend from 'extend';
import { database, getEnv } from '../config/index';
import { underline } from '@poech/camel-hump-under';

import is from '@poech/type-is';

let connection;
const parseOption = (options) => {
  if (!options) {
    throw `[SQL] Missing argument options`;
  }
  if (is.string(options)) {
    options = { where: options }
  }
  if (is.function(options)) {
    options = { callback: options }
  }
  return options;
}
const parseTableName = ({ tableName, alias } = {}) => {
  if (!tableName) {
    throw `[SQL] Missing Argument tableName`;
  }
  tableName = underline(tableName).replace(/^_/, '');
  if (alias) {
    tableName = `${alias}_${tableName}`;
  }

  return tableName;

}
const parseWhere = (...condi) => {
  return (condi || []).map((item, index) => {

    if (is.array(item)) {
      return parseWhere(...item)
    }

    if (is.string(item)) {
      return item.trim()
    }

    if (is.object(item)) {
      let sub = [];
      for (let col in item) {
        if (is.string(item[col])) {

          sub.push(`${col} = '${item[col]}'`);
        } else {

          sub.push(`${col} = ${item[col]}`);
        }
      }
      return sub.join(' AND ');
    }

    if (is.number(item)) {
      return `id = ${item}`
    }
  }).join(' OR ');
}
const connect = () => (new Promise((resolve, reject) => {
  connection.connect((err) => {
    if (err) {
      return reject('sql connect failure!');
    }
    return resolve()
  })
}))
const query = (sql) => (new Promise((resolve, reject) => {
  connection.query(sql, (err, result) => {
    if (err) {
      return reject(`query sql ( ${sql} ) failure!`);
    }
    return resolve({ result, sql })
  })
}))
const Db = function (options) {
  this.config = extend(true, {}, database, options || {});
  this.options = {};
  connection = createConnection(this.config);

  return this;
}
Db.prototype.table = function (tname) {
  this.options.tableName = tname;
  return this;
}
Db.table = function (tname) {
  return (new Db()).table(tname)
}
Db.prototype.where = function (...condi) {

  this.options.where = parseWhere(...condi);
  return this;
}
Db.prototype.join = function (tables) {
  this.options.join = tables;
  return this;
}
Db.prototype.fields = function (fields) {
  if (is.string(fields)) {
    fields = fields.split(/[,\s]+/).filter((item) => (item));
  }
  if (is.array(fields)) {
    fields = fields.join(',');
  }
  this.options.fields = fields;
  return this;
}
Db.prototype.all = async function (...condi) {
  let tname = parseTableName(this.options);
  let fields = this.options.fields || '*';
  let where = [this.options.where, parseWhere(...condi)].filter((w) => (!!w))

  where = !is.empty(where) ? `WHERE ${where}` : '';

  let sql = `SELECT ${fields} FROM ${tname} ${where}`
  try {
    await connect();
    let rlt = await query(sql);
    console.log(rlt.sql, rlt.result)
    if (is.empty(rlt.result)) {
      return [];
    } else {
      return rlt.result;
    }
  } catch (err) {
    console.error(err)
    return []
  } finally {
    this.options = {}
  }
}
Db.prototype.get = async function (...condi) {
  let datas = await this.all(...condi);
  if (is.empty(datas)) {
    return null
  }
  return datas[0];
}


Db.prototype.count = async function (...condi) {

  let tname = parseTableName(this.options);

  let where = [this.options.where, parseWhere(...condi)].filter((w) => (!!w))

  where = !is.empty(where) ? `WHERE ${where}` : '';

  let sql = `SELECT COUNT(*) as count FROM ${tname} ${where}`
  try {
    await connect();
    let rlt = await query(sql);
    console.log(rlt.sql, rlt.result)

    return rlt.result[0].count;

  } catch (err) {
    console.error(err)
    return null
  } finally {
    this.options = {}
  }

}

const parseData = (data, cols) => {
  let values = cols.split(',').map((col) => {
    let v = data[col.trim()]
    if (is.string(v)) {
      v = `'${v}'`
    }
    return v !== undefined ? v : '';
  })
  return `(${values.join(', ')})`;
}
const parseColumns = (data) => {
  let obj
  if (is.array(data)) {
    obj = extend({}, ...data);
  } else if (is.object(data)) {
    obj = data;
  } else {
    throw new Error('invalid data format')
  }

  return Object.keys(obj);
}
Db.prototype.append = async function (data) {

  let tname = parseTableName(this.options);
  let fields = this.options.fields;
  if (!fields) {
    fields = parseColumns(data).join(',')
  }
  let sql, dataList;
  if (is.object(data)) {
    dataList = parseData(data, fields);
  } else if (is.array(data)) {
    dataList = data.map((item) => (parseData(item, fields))).join(', ');
  } else {
    throw new Error('invalid data format')
  }

  sql = `INSERT INTO ${tname} (${fields}) VALUES ${dataList}`

  try {
    await connect();
    let rlt = await query(sql);
    console.log(rlt.sql, rlt.result)

    return rlt.result;

  } catch (err) {
    console.error(err)
    return null
  } finally {
    this.options = {}
  }

}
export { Db };
export const db = (tname) => (Db.table(tname))
export default { Db, db };
