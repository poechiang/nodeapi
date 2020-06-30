import debug from 'debug';
import http from 'http';

import createError from 'http-errors';

const debuger = debug('nodeapi:server');

const runServer = (app,port)=>{

    app.use(function(req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    
    });
    
    app.set('port', port );

    var server = http.createServer(app);

    server.on('error', () => {
    
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
    });
    server.on('listening', () => {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debuger('Listening on ' + bind);
    });

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    return server
}

export {runServer}