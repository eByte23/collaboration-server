import { Events, SocketHandler } from '../events';

const chanageEventHandler : SocketHandler = {
    handle(socket: SocketIO.Socket, fn: (err?: any) => void) {
        socket.on("ChangeEvent", ($event: Events.ChangeEvent) => {
            console.log($event);
            let x = Object.keys(socket.rooms).filter((v) => v != socket.id);
            socket.broadcast.to(x[0]).emit("ChangeEvent", $event);
        });

    }
};

export default chanageEventHandler.handle;
