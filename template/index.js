import express from 'express';
import http from 'http';
import { sysResource_WebsocketData } from './components/websocketData.js';
import { sysresource_APIData } from './components/APIData.js';
import cors from 'cors';
// Create an Express app (optional)
const app = express();

const secretKey_SysResource = process.env.SYSRESOURCE_API_KEY;

app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'https://sysresource.vercel.app',
    methods: 'GET,POST',
    credentials: true, // Enable cookies and authentication headers (if needed)
};

app.use(cors(corsOptions));

//Integrating WebSocket

app.get('/sysresource/:key', (req, res) => {
    const { key } = req.params;
    const secretKey = secretKey_SysResource;
    const data = sysresource_APIData({ paramKey: key, key: secretKey });
    if(data.success) {
        res.status(200).send(data.data);
    } else {
        res.status(401).send(data.error);
    }
});

// Create an HTTP server
const server = http.createServer(app);

// Define WebSocket authentication key and data sending interval
const authKey = secretKey_SysResource;
const interval = 5000; // Send data every 5 seconds (in milliseconds)

// Pass the HTTP server to the WebSocket handler
sysResource_WebsocketData(server, { key: authKey, interval });

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log('Monitoring Service Listening on Port 4000');
});