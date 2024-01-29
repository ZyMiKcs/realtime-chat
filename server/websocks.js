const WebSocket = require('ws');

const wss = new WebSocket.Server(
    {
        port: 5000,
    },
    () => console.log('Server started on 5000 port')
);

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
