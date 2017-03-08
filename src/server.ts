import * as express from 'express';
import * as http from 'http';
import * as ioserver from 'socket.io';
import router from './routes';
import bootstrap from './bootstrap';
import * as bodyParser from 'body-parser';
import * as sockets from './sockets';

let app = express();
let server = http.createServer(app);
let io = ioserver(server);
let args = bootstrap.getArgs();

app.use(bodyParser.json());
app.use(router);
sockets.setup(io);

server.listen(args.port, args.host, function () {
    console.log(`Server is running on port ${args.host}:${args.port}`);
});