import * as express from 'express';
import * as http from 'http';
import * as ioserver from 'socket.io';
import router from './routes';

let app = express();
let server = http.createServer(app);
let io = ioserver(server);

let port: number = process.env.PORT || 3000;
let host: string = process.env.host || "127.0.0.1"; //"192.168.160.143";

app.use(router);

io.on('connection', function (e) {
    //e.
});


server.listen(port, host);
server.listen(3000,"127.1.0.1")


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

console.log(`Server is running on port ${host}:${port}`);