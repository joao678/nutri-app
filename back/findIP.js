import { networkInterfaces } from 'os';
import { writeFile } from 'fs';

const nets = networkInterfaces();
const networkIndex = 0;
const ip = nets[Object.keys(nets)[networkIndex]].filter(net => net.family === 'IPv4' && !net.internal)[0].address;

writeFile('./.env', `HOST=${ip}`,() => {});