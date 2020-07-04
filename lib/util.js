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
    isUndefined
} from 'util';
import colors from 'colors-console';
const underline = ( str ) => {
    return (str||'').replace(/[A-Z-]/g,(item)=>('_'+item.toLowerCase())).split('_').filter((item)=>(!!item)).join('_');
}

const camel = ( str ) => {
    return (str||'').replace(/[_-][a-z]/g,(item)=>(item.replace(/[_-]/g,'').toUpperCase()));
}

const hump = ( str ) => {
    return (str||'').replace(/[A-Z_]/g,(item)=>('-'+item.toLowerCase())).split('-').filter((item)=>(!!item)).join('-');
}

export const Console = {
    log : (msg)=>{
        console.log(colors('grey',`DEBUG\t@ ${Date.format('YYYY-mm-dd HH:MM:ss.fff')}\t>>> ${msg}`))
    },
    info : (msg)=>{
        console.info(colors('blue',`INFO\t@ ${Date.format('YYYY-mm-dd HH:MM:ss.fff')}\t>>> ${msg}`))
    },
    warn : (msg)=>{
        console.info(colors('yellow',`WARN\t@ ${Date.format('YYYY-mm-dd HH:MM:ss.fff')}\t>>> ${msg}`))
    },
    error : (msg)=>{
        console.info(colors('red',`ERROR\t@ ${Date.format('YYYY-mm-dd HH:MM:ss.fff')}\t>>> ${msg}`))
    },
    success : (msg)=>{
        console.info(colors('green',`SUCCESS\t@ ${Date.format('YYYY-mm-dd HH:MM:ss.fff')}\t>>> ${msg}`))
    }
}
export const is = {
    array:isArray,
    boolean:isBoolean,
    buffer:isBuffer,
    date:isDate,
    equal:isDeepStrictEqual,
    error:isError,
    function:isFunction,
    null:isNull,
    empty:isNullOrUndefined,
    object:isObject,
    primitive:isPrimitive,
    regexp:isRegExp,
    string:isString,
    symbol:isSymbol,
    undefined:isUndefined
};
export {underline,camel,hump}

export default {
    is,
    underline,camel,hump,
    Console
}