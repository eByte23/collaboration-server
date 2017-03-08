import { Events, SocketHandler } from '../events';

const sessionEventsHandler : SocketHandler = {
    handle(socket: SocketIO.Socket, fn: (err?: any) => void) {
        socket.on("JoinSession", ($event: Events.JoinSession) => {
            console.log(`${$event.by} joined session: ${$event.sessionId}`);
            socket.join($event.sessionId);
        });

        socket.on("StartSession", ($event: Events.StartSession) => {
            console.log(`${$event.by} started session: ${$event.sessionId}`);
            socket.join($event.sessionId);
        });
    }
};

export default sessionEventsHandler.handle;