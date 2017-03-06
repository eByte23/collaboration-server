"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const ioserver = require("socket.io");
const routes_1 = require("./routes");
const bootstrap_1 = require("./bootstrap");
const bodyParser = require("body-parser");
let app = express();
let server = http.createServer(app);
let io = ioserver(server);
let args = bootstrap_1.default.getArgs();
app.use(bodyParser.json());
app.use(routes_1.default);
io.on('connection', function (e) {
    console.log(e.id);
    e.on("JoinSession", ($event) => {
        e.join($event.sessionId);
        console.log(`${$event.by} joined session: ${$event.sessionId}`);
    });
    e.on("StartSession", ($event) => {
        e.join($event.sessionId);
        console.log(`${$event.by} started session: ${$event.sessionId}`);
    });
    e.on("ChangeEvent", ($event) => {
        console.log($event);
        let x = Object.keys(e.rooms).filter((v) => v != e.id);
        io.sockets.in(x[0]).emit("ChangeEvent", $event);
    });
});
server.listen(args.port, args.host, function () {
    console.log('Ready');
    console.log(`Server is running on port ${args.host}:${args.port}`);
});
var Events;
(function (Events) {
    class ChangeEvent {
        constructor(diff, by) {
            this.type = "ChangeEvent";
            this.data = diff;
            this.by = by;
        }
    }
    Events.ChangeEvent = ChangeEvent;
    class JoinSession {
        constructor(sessionId, by) {
            this.type = "JoinSession";
            this.by = by;
            this.sessionId = sessionId;
        }
    }
    Events.JoinSession = JoinSession;
    class StartSession {
        constructor(sessionId, by) {
            this.type = "StartSession";
            this.by = by;
            this.sessionId = sessionId;
        }
    }
    Events.StartSession = StartSession;
})(Events = exports.Events || (exports.Events = {}));
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
//# sourceMappingURL=server.js.map