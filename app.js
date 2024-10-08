const AppServer = require('./src/index');
const appServer = new AppServer();
const ctx = 'app-serve';

appServer.init().catch((err) => {
    console.log(ctx, `Exiting due to ${err}`, {'error.message': JSON.stringify(err), 'event.outcome': 'failure'});
    appServer.server.close();
    process.exitCode = 1;
    throw err;
});