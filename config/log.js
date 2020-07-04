const morgan = {
    enabled:true,
    format:'common',//combined|common|dev|short|tiny|{custom1:……，custom2:……}
    level:'debug',
    out:['file','std'], // file,std,[file,std]
    file:'runtime/logs',
    database: ( line ) => {},
    rotator:true
};

export default {morgan}