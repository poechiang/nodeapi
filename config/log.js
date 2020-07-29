const morgan = {
    enabled:true,
    format:['combined', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] :res[content] ":referrer" ":user-agent"'],//combined|common|dev|short|tiny|{custom1:……，custom2:……}
    level:'debug',
    out:['file','std'], // file,std,[file,std]
    file:'runtime/logs',
    database: ( line ) => {},
    rotator:true
};

export default {morgan}