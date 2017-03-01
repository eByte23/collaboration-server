import WebSocket = require('ws');

var port: number = process.env.PORT || 3000;
var host: string = process.env.host || "127.0.0.1";
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ host: host, port: port });

server.on('connection', ws => {
    ws.on('message', ($event) => {
        console.log($event);
        try {
            console.log($event);

            broadcast($event);
        } catch (e) {
            console.error(e.message);
        }
    });
    ws.on('error', (err) => {
        console.log(err);
    });
});

server.on('error', (err) => {
    console.log(err);
});

function broadcast(data: string): void {
    server.clients.forEach(client => {
        client.send(data);
    });
};

console.log(`Server is running on port ${host}:${port}`);