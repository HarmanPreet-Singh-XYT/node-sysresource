import os from 'os';

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

export function sysresource_APIData(options) {
    const { paramKey, key: authKey } = options;
    if(paramKey !== authKey) {
        return {
            success: false, error: 'Unauthorized key',data: null}
    }
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
    return {success:true,error:null,data:data}
}