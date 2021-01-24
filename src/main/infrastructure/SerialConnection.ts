import SerialPort from 'serialport';

export async function getComPorts(): Promise<string[]> {
  const ports = await SerialPort.list();
  return ports.filter((p) => p.manufacturer).map((p) => p.path);
}

export type Subscriber = (buffer: Buffer) => void;
export type Unsubscribe = () => void;

export interface Connection {
  isOpen(): boolean;

  open(): Promise<void>;

  subscribe(subscriber: Subscriber): Unsubscribe;

  close(): Promise<void>;
}

export class SerialConnection implements Connection {
  private serialPort: SerialPort;

  constructor(serialPort: SerialPort) {
    this.serialPort = serialPort;
  }

  isOpen(): boolean {
    return this.serialPort.isOpen;
  }

  open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.serialPort.open((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  subscribe(subscriber: Subscriber): Unsubscribe {
    this.serialPort.on('data', subscriber);
    return (): void => {
      this.serialPort.off('data', subscriber);
    };
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.serialPort.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  static create(port: string): SerialConnection {
    return new SerialConnection(
      new SerialPort(port, {
        baudRate: 115200,
      })
    );
  }
}
