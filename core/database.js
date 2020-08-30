import { createConnection } from 'mysql';
import extend from 'extend';
import config from '../config/index';
import util, { Console } from '../lib/util';
import {
    isArray,
    isBoolean,
    isBuffer,
    isDate,
    isDeepStrictEqual,
    isError,
    isFunction,
    isNull,
    isNullOrUndefined,
    isObject,
    isPrimitive,
    isRegExp,
    isString,
    isSymbol,
    isUndefined,
    isNumber
} from 'util';

let connection;
const parseOption = ( options ) => {
    if ( !options ) {
        throw `[SQL] Missing argument options`;
    }
    if ( util.is.string( options ) ) {
        options = { where: options }
    }
    if ( util.is.function( options ) ) {
        options = { callback: options }
    }
    return options;
}
const parseTableName = ( { tableName, alias } = {} ) => {
    if ( !tableName ) {
        throw `[SQL] Missing Argument tableName`;
    }
    tableName = util.underline( tableName ).replace( /^_/, '' );
    if ( alias ) {
        tableName = `${alias}_${tableName}`;
    }

    return tableName;

}
const parseWhere = ( ...condi ) => {
    ( condi || [ ] ).map( ( item, index ) => {

        if ( isArray( item ) ) {
            return parseWhere( ...item )
        }

        if ( isString( item ) ) {
            return item.trim( )
        }

        if ( isObject( item ) ) {
            let sub = [ ];
            for ( let col in item ) {
                sub.push( `${col} = ${item[col]}` );
            }
            return sub.join( ' AND ' );
        }

        if ( isNumber( item ) ) {
            return `id = ${item}`
        }
    } ).join( ' OR ' );
}

const insert = ( sql, data, value ) => {

    const cb = ( err, result ) => {
        if ( err ) {
            return reject( 'sql connect failure!' );
        }
        return resolve( { result, sql } )
    }


    return new Promise( ( resolve, reject ) => {
        connection.connect( ( err ) => {
            if ( err ) {
                return reject( 'sql connect failure!' );
            }

            Console.info( 'sql connect success' );

            if ( Array.isArray( data ) ) {
                connection.query( sql, values, cb )
            } else if ( typeof data === 'object' ) {
                connection.query( sql, cb )
            }

        } )
        Console.log( sql )
    } )
}
const Db = function ( options ) {
    this.config = extend( true, {}, config, options || {} );
    this.options = {};
    connection = createConnection( this.config );
    return this;
}
Db.prototype.table = function ( tname ) {
    this.options.tableName = tname;
    return this;
}
Db.table = function ( tname ) {
    return ( new Db( ) ).table( tname )
}
Db.prototype.where = function ( ...condi ) {

    this.options.where = parseWhere( ...condi );
    return this;
}
Db.prototype.join = function ( tables ) {
    this.options.join = tables;
    return this;
}
Db.prototype.fields = function ( fields ) {
    if ( util.is.string( fields ) ) {
        fields = fields.split( /[,\s]+/ ).filter( ( item ) => ( item ) );
    }
    if ( util.is.array( fields ) ) {
        fields = fields.join( ',' );
    }
    this.options.fields = fields;
    return this;
}
Db.prototype.all = function ( condi ) {
    return new Promise( ( resolve, reject ) => {
        let tname = parseTableName( options );
        let fields = this.options.tableName;
        let where;
        if ( typeof condi == 'string' ) {
            where = condi
        } else if ( typeof condi === 'number' ) {
            where = `${this.options.pk||'id'}=${condi}`
        } else if (
            where = condi.map( ( item ) => {
                if ( typeof item == 'string' ) {
                    return item;
                } else if ( typeof item === 'number' ) {
                    return `${this.options.pk||'id'}=${item}`
                }
            } ).join( ' OR ' )
        )
            where = where ? `WHERE ${where}` : ''
        let sql = `SELECT ${fields} FROM ${tname} ${where}`
        connection.connect( ( err ) => {
            if ( err ) {
                return reject( 'sql connect failure!' );
            }
            connection.query( sql, ( err, result ) => {
                if ( err ) {
                    return reject( 'sql connect failure!' );
                }
                return resolve( { result, sql } )
            } )

        } )
    } )

}
Db.prototype.get = async function ( ...condi ) {
    return new Promise( ( resolve, reject ) => {
        let tname = parseTableName( options );
        let fields = this.options.tableName;
        let where = parseWhere( ...condi )
        where = where ? `WHERE ${where}` : ''
        let sql = `SELECT ${fields} FROM ${tname} ${where}`
        connection.connect( ( err ) => {
            if ( err ) {
                return reject( 'sql connect failure!' );
            }
            connection.query( sql, ( err, result ) => {
                if ( err ) {
                    return reject( 'sql connect failure!' );
                }
                return resolve( { result, sql } )
            } )

        } )
    } )
}


Db.prototype.count = async function ( ...condi ) {
    return new Promise( ( resolve, reject ) => {
        let tname = parseTableName( options );
        let fields = this.options.tableName;
        let where = parseWhere( ...condi )
        where = where ? `WHERE ${where}` : ''
        let sql = `SELECT COUNT(*) FROM ${tname} ${where}`
        connection.connect( ( err ) => {
            if ( err ) {
                return reject( 'sql connect failure!' );
            }
            connection.query( sql, ( err, result ) => {
                if ( err ) {
                    return reject( 'sql connect failure!' );
                }
                return resolve( { result: result.length, sql } )
            } )

        } )
    } )
}
const parseData = ( data ) => {

}
const parseColumns = ( data, fields ) => {
    if ( fields ) {
        if ( Array.isArray( fields ) ) {
            return fields;
        } else {
            return Object.valueOf( fields )
        }
    }
    if ( Array.isArray( data ) ) {

    } else if ( typeof data === 'object' ) {

    }
}
Db.prototype.append = async function ( data ) {

    let tname = parseTableName( this.options );
    let fields = this.options.fields;

    let sql = `INSERT INTO ${tname} (${fields || columns.join(', ')}) VALUES `;
    if ( Array.isArray( data ) ) {
        sql = `INSERT INTO ${tname} (${fields || columns.join(', ')}) VALUES ?`
    } else if ( typeof data === 'object' ) {
        let columns = [ ],
            values = [ ];
        for ( let col in data ) {
            columns.push( col )
            values.push( data[ col ] )
        }
        sql = `INSERT INTO ${tname} (${columns.join(', ')}) VALUES (${values.join(', ')})`
        Console.info( tname, columns )
    } else {
        reject( 'invalid data format' )
    }

    return await insert( sql, data )

}
export { Db };
export const db = ( tname ) => ( Db.table( tname ) )
export default { Db, db };