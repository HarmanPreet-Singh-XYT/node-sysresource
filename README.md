# Get Started by a simple command through terminal
1. Run command in Terminal at choosen location:    
    ```bash
    npx node-sysresource
    ```
2. Go into choosen folder named by you or node-sysresource and run:
    ```bash
    npm run start
    ```
3. Open site - sysresource.vercel.app and add your server, both API and Websocket are supported.



# SysResource

**SysResource** is a powerful system resource monitoring tool that allows you to track server performance metrics such as CPU usage, memory utilization, and uptime. It provides detailed information about server hardware and software configurations, with a user-friendly interface that includes real-time charts and sound alerts for system thresholds and server downtime. It supports WebSocket and API integrations, offering flexible options for monitoring multiple servers.

## Features

- **Server Monitoring**: Monitor CPU, memory, uptime, hostname, CPU cores, total memory, free memory, platform, type, architecture, environment, and more.
- **Charts**: Real-time line chart representations for CPU and memory usage.
- **Grouping**: Organize servers into groups for better management and separation.
- **Alerts**: Sound notifications when a server goes down or resource usage surpasses thresholds.
- **WebSocket & API**: Two options to monitor resources – via WebSocket or API.
- **Settings**: Configure API interval, max retries, and store settings in local storage.
- **Documentation**: Comprehensive documentation to help you get started.
  

## Usage
After installation, open the application in your browser. You'll be able to:
- Monitor system resources such as CPU and memory in real-time.
- Group servers based on different criteria.
- Set custom API intervals and max retry attempts, stored in local storage.
- Use WebSocket or REST API to fetch system data.
- Receive sound alerts when servers go down or resources exceed configured thresholds.

## API Documentation
Sysresource exposes several APIs to fetch server data. Below is an example of how to use the API:
- **Get Server Data**:
    ```bash
    GET /sysresource
    ```
- **Response**
    ```bash
    {
    "hostname": "DESKTOP-S283TVV",
    "cpuUsage": 34,
    "cpu": "Intel(R) Core(TM) i9-9900K CPU @ 3.60GHz",
    "cpuCore": 8,
    "totalMemory": 17108,
    "freeMemory": 4767,
    "release": "10.0.19045",
    "platform": "win32",
    "uptime": 2925,
    "type": "Windows_NT",
    "machine": "x86_64",
    "architecture": "x64",
    "environment": "NodeJS"
    }
    ```
For complete API documentation, visit [API Docs](https://sysresource.vercel.app/docs)

## Settings
You can configure several settings for sysresource:
- **Websocket Interval:** Set the interval for messages.
- **API Key:** Define the Connection Key through env file.

# Contributing
Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch (git checkout -b feature-branch).**
3. **Commit your changes (git commit -m 'Add feature').**
4. **Push to the branch (git push origin feature-branch).**
5. **Open a pull request.**

# License
**This project is licensed under the MIT License – see the LICENSE file for details.**