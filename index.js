const express = require("express");
const path = require("path");
const http = require('http');
const ws = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const PORT = 3001;






server.on('upgrade', (request, socket, head) => {
	const { url } = request;
	if (url === '/wss') {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request);
		});
	} else {
		socket.destroy();
	}
});

app.use(express.static("public"));

wss.on('connection', (ws) => {
	console.log('WebSocket client connected');
	runCommand("say Bluetooth has connected successfully!", ws);

	ws.on('message', (msg) => {
		console.log("Received:", msg.toString());
	});
});


function runCommand(cmd, ws) {
	ws.send(JSON.stringify({
		header: {
			requestId: uuid.v4(),
			version: 1,
			messagePurpose: "commandRequest",
			messageType: "commandRequest"
		},
		body: {
			commandLine: cmd,
			version: 1
		}
	}));
}

app.listen(PORT, () => {
    console.log(`Server running at http:://localhost:${PORT}`);
    console.log('WebSocket endpoint: ws://localhost:3001/wss');
});
