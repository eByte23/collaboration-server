import * as express from 'express';
import * as http from 'http';
import * as ioserver from 'socket.io';
import router from './routes';
import bootstrap from './bootstrap';
import * as bodyParser from 'body-parser';

let app = express();
let server = http.createServer(app);
let io = ioserver(server);
let args = bootstrap.getArgs();


app.use(bodyParser.json());
app.use(router);

io.on('connection', function (e) {
    console.log(e.id);

    e.on("JoinSession", ($event: Events.JoinSession) => {
        e.join($event.sessionId);
        console.log(`${$event.by} joined session: ${$event.sessionId}`);
    });

    e.on("StartSession", ($event: Events.StartSession) => {
        e.join($event.sessionId);
        console.log(`${$event.by} started session: ${$event.sessionId}`);
    });

    e.on("ChangeEvent", ($event: Events.ChangeEvent) => {
        console.log($event);
        let x = Object.keys(e.rooms).filter((v)=> v!= e.id);
        io.sockets.in(x[0]).emit("ChangeEvent", $event);
    });
});

server.listen(args.port, args.host, function () {
    console.log('Ready');
    console.log(`Server is running on port ${args.host}:${args.port}`);
});

export module Events {
    export class ChangeEvent implements IEvent {

        constructor(diff: Diff, by: string) {
            this.data = diff;
            this.by = by;
        }

        by: string; // TODO: This could change to an ID given when connecting to session
        data: Diff;
        type: string = "ChangeEvent";
    }

    export interface Diff {
        relativeFileName: string;
        delta: string;
        checksum: string;
        version: number;
        lastRecievedVersion: number;
    }

    export class JoinSession implements IEvent {
        constructor(sessionId: string, by: string) {
            this.by = by;
            this.sessionId = sessionId;
        }

        by: string;
        data: any;
        type: string = "JoinSession";
        sessionId: string;
    }

    export class StartSession implements IEvent {
        constructor(sessionId: string, by: string) {
            this.by = by;
            this.sessionId = sessionId;
        }

        by: string;
        data: any;
        type: string = "StartSession";
        sessionId: string;
    }
}

export interface IEvent {
    by: string,
    data: any,
    type: string
}


// server.on('connection', ws => {
//     ws.on('message', ($event) => {
//         console.log($event);
//         try {
//             console.log($event);
//             ws.
//             broadcast($event);
//         } catch (e) {
//             console.error(e.message);
//         }
//     });
//     ws.on('error', (err) => {
//         console.log(err);
//     });
// });

// server.on('error', (err) => {
//     console.log(err);
// });

// function broadcast(data: string): void {
//     server.clients.forEach(client => {
//         client.send(data);
//     });
// };

