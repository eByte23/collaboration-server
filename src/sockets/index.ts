import * as ioserver from 'socket.io';
import changeEventsHandler from './changeEventsHandler';
import sessionEventsHandler from './sessionEventsHandler';

export default this;

export function setup(server: SocketIO.Server){

    server.on('connection', function (e) {
        console.log(`new connection id: ${e.id}`)
    });

    server.use(changeEventsHandler);
    server.use(sessionEventsHandler);

}