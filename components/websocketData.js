import { server as WebSocketServer } from 'websocket';  // WebSocket server from the 'websocket' package
import os from 'os';
import url from 'url';

let previousCpuInfo = os.cpus();

function calculateCpuUsage() {
    const currentCpuInfo = os.cpus();

    let idleDiff = 0;
    let totalDiff = 0;

    for (let i = 0; i < currentCpuInfo.length; i++) {
        const previous = previousCpuInfo[i].times;
        const current = currentCpuInfo[i].times;

        const prevIdle = previous.idle;
        const prevTotal = Object.values(previous).reduce((acc, val) => acc + val, 0);

        const currIdle = current.idle;
        const currTotal = Object.values(current).reduce((acc, val) => acc + val, 0);

        idleDiff += currIdle - prevIdle;
        totalDiff += currTotal - prevTotal;
    }

    const cpuUsagePercent = 100 - Math.floor((idleDiff / totalDiff) * 100);

    previousCpuInfo = currentCpuInfo;

    return (cpuUsagePercent>=0 && cpuUsagePercent<=100)?cpuUsagePercent:0;
}
// Define a function to start WebSocket server with key-based authentication
export function sysResource_WebsocketData(server, options){
    const { key: authKey, interval } = options;

    // Create a WebSocket server attached to the HTTP server
    const wss = new WebSocketServer({
        httpServer: server  // Attach to the provided HTTP server
    });

    // Handle WebSocket requests and connections
    wss.on('request', (req) => {
        const requestUrl = url.parse(req.httpRequest.url || '', true);
        const params = requestUrl.query;
        // Only allow connections to the /sysresource path
        if (requestUrl.pathname !== '/sysresource') {
            req.reject(404, 'Not Found');
            return;
        }
        // Check if the provided key matches the server's key
        if (params.key !== authKey) {
            // console.log('Client attempted to connect with an invalid key.');
            req.reject(1008, 'Unauthorized');  // Reject the request if the key is invalid
            return;
        }

        // console.log('Client connected via WebSocket with valid key');
        const connection = req.accept(null, req.origin);

        // Function to send system resource data periodically
        const sendSystemResources = () => {
            const data = {
                hostname: os.hostname(),
                cpuUsage:calculateCpuUsage(),
                cpu: os.cpus()[0].model,
                cpuCore: os.cpus().length,
                totalMemory: Math.round(os.totalmem() * 0.000001),
                freeMemory: Math.round(os.freemem() * 0.000001),
                release: os.release(),
                platform: os.platform(),
                uptime: Math.round(os.uptime() / 60),  // in minutes
                type: os.type(),
                machine: os.machine(),
                architecture: os.arch(),
                environment:'NodeJS'
            };
            connection.sendUTF(JSON.stringify(data));
        };

        // Set interval to send data based on the provided interval
        const dataInterval = setInterval(sendSystemResources, interval);

        // Handle WebSocket connection close event
        connection.on('close', () => {
            // console.log('Client disconnected');
            clearInterval(dataInterval);  // Stop sending data when the client disconnects
        });
    });
};