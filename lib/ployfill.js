if(!Array.prototype.contains){
    Object.defineProperty(Array.prototype,'contains',{
        enumerable:false,
        configurable:false,
        value:function(item){
            return this.indexOf(item)>=0;
        }
    })
}

if(!Object.prototype.forEach){
    Object.defineProperty(Object.prototype,'forEach',{
        enumerable:false,
        configurable:false,
        value:function(cb){
            if(!cb){
                return;
            }
            for(let key in this){
                cb.apply(this[key],[this[key],key])
            }
        }
    })
}
const getDtObj = (now)=>{
    let 
        fullyear = now.getFullYear(),
        year = now.getYear(),
        month = now.getMonth(),
        day = now.getDate(),
        week = now.getDay(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds(),
        muliSecond = now.getMilliseconds()
        
    return {fullyear,year,month,day,week,hour,minute,second,muliSecond,week}

}
if(!Date.prototype.format){
    Object.defineProperty(Date.prototype,'format',{
        enumerable:false,
        configurable:false,
        value:function(format){
            let dt = getDtObj(this);
            return format.replace(/Y{2,4}|m{1,3}|d{1,2}|w{1,3}|W{1,3}|h{1,2}|H{1,2}|M{1,2}|s{1,2}|f{1,3}/g,(item)=>{
                if( item === 'YYYY' ){
                    return dt.fullyear
                }
                else if( item === 'YY' ){
                    return dt.year
                }
                else if( item === 'm' ){
                    return dt.month + 1
                }
                else if( item === 'mm' ){
                    return (dt.month + 1).toString().padStart(2,0)
                }
                else if (item === 'mmm'){
                    return ['Jan.','Fab.','Mar.','Apr.','May.','Jun.','Jul.','Agu.','Sep.','Oct.','Nov.','Dec.'][dt.month]
                }
                else if(item==='d'){
                    return dt.day
                }
                else if(item==='dd'){
                    return dt.day.toString().padStart(2,0)
                }
                else if (item === 'w'){
                    return dt.week;
                }
                else if (item === 'W'){
                    return ['日','一','二','三','四','五','六'][dt.week];
                }
                else if (item === 'www'){
                    return ['Sun.','Mon.','Tue.','Wen.','Thu.','Fri.','Sat.'][dt.week]
                }
                else if (item === 'WWW'){
                    return ['周日','周一','周二','周三','周四','周五','周六'][dt.week]
                }
                else if (item === 'h'){
                    return dt.hour>12?(dt.hour%13)+1:dt.hour;
                }
                else if (item === 'hh'){
                    let h = dt.hour>12?(dt.hour%13)+1:dt.hour;
                    return h.toString().padStart(2,0);
                }
                else if (item === 'H'){
                    return dt.hour;
                }
                else if (item === 'HH'){
                    return dt.hour.toString().padStart(2,0);
                }
                else if (item === 'M'){
                    return dt.minute;
                }
                else if (item === 'MM'){
                    return dt.minute.toString().padStart(2,0);
                }
                else if (item === 's'){
                    return dt.second;
                }
                else if (item === 'ss'){
                    return dt.second.toString().padStart(2,0);
                }
                else if (item === 'f'){
                    return dt.muliSecond;
                }
                else if (item === 'ff'){
                    return Math.floor(dt.muliSecond/10).toString().padStart(2,0);
                }
                else if (item === 'fff'){
                    return dt.muliSecond.toString().padStart(3,0);
                }

            })
        }
    })
}

if(!Date.format){
    Object.defineProperty(Date,'format',{
        enumerable:false,
        configurable:false,
        value:function(format){
            let dt = getDtObj(new Date());
            return format.replace(/Y{2,4}|m{1,3}|d{1,2}|w{1,3}|W{1,3}|h{1,2}|H{1,2}|M{1,2}|s{1,2}|f{1,3}/g,(item)=>{
                if( item === 'YYYY' ){
                    return dt.fullyear
                }
                else if( item === 'YY' ){
                    return dt.year
                }
                else if( item === 'm' ){
                    return dt.month + 1
                }
                else if( item === 'mm' ){
                    return (dt.month + 1).toString().padStart(2,0)
                }
                else if (item === 'mmm'){
                    return ['Jan.','Fab.','Mar.','Apr.','May.','Jun.','Jul.','Agu.','Sep.','Oct.','Nov.','Dec.'][dt.month]
                }
                else if(item==='d'){
                    return dt.day
                }
                else if(item==='dd'){
                    return dt.day.toString().padStart(2,0)
                }
                else if (item === 'w'){
                    return dt.week;
                }
                else if (item === 'W'){
                    return ['日','一','二','三','四','五','六'][dt.week];
                }
                else if (item === 'www'){
                    return ['Sun.','Mon.','Tue.','Wen.','Thu.','Fri.','Sat.'][dt.week]
                }
                else if (item === 'WWW'){
                    return ['周日','周一','周二','周三','周四','周五','周六'][dt.week]
                }
                else if (item === 'h'){
                    return dt.hour>12?(dt.hour%13)+1:dt.hour;
                }
                else if (item === 'hh'){
                    let h = dt.hour>12?(dt.hour%13)+1:dt.hour;
                    return h.toString().padStart(2,0);
                }
                else if (item === 'H'){
                    return dt.hour;
                }
                else if (item === 'HH'){
                    return dt.hour.toString().padStart(2,0);
                }
                else if (item === 'M'){
                    return dt.minute;
                }
                else if (item === 'MM'){
                    return dt.minute.toString().padStart(2,0);
                }
                else if (item === 's'){
                    return dt.second;
                }
                else if (item === 'ss'){
                    return dt.second.toString().padStart(2,0);
                }
                else if (item === 'f'){
                    return dt.muliSecond;
                }
                else if (item === 'ff'){
                    return Math.floor(dt.muliSecond/10).toString().padStart(2,0);
                }
                else if (item === 'fff'){
                    return dt.muliSecond.toString().padStart(3,0);
                }

            })
        }
    })
}
