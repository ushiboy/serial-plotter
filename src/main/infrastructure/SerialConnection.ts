import * as SerialPort from 'serialport';

export async function getComPorts(): Promise<string[]> {
  const ports = await SerialPort.list();
  return ports.filter((p) => p.manufacturer).map((p) => p.path);
}
