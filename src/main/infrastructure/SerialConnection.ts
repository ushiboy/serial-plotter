import SerialPort from 'serialport';

export async function getComPorts(): Promise<string[]> {
  const ports = await SerialPort.list();
  return ports.filter((p) => p.manufacturer).map((p) => p.path);
}

export type Subscriber = (buffer: Buffer) => void;
export type Unsubscribe = () => void;

export interface Connection {
  isOpen(): boolean;

  open(port: string): Promise<void>;

  subscribe(subscriber: Subscriber): Unsubscribe;

  close(): Promise<void>;
}

export class SerialConnection implements Connection {
  private serialPort: SerialPort | null;
  private subscribers: Subscriber[];

  constructor(subscribers: Subscriber[] = []) {
    this.serialPort = null;
    this.subscribers = subscribers;
  }

  isOpen(): boolean {
    return this.serialPort?.isOpen;
  }

  open(port: string): Promise<void> {
    this.serialPort = new SerialPort(port, {
      baudRate: 115200,
      autoOpen: false,
    });
    this.subscribers.forEach((f) => {
      this.serialPort.on('data', f);
    });
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
    if (this.serialPort === null) {
      throw new Error('SerialPort does not open');
    }
    this.serialPort.on('data', subscriber);
    return (): void => {
      this.serialPort.off('data', subscriber);
    };
  }

  close(): Promise<void> {
    if (this.serialPort === null) {
      throw new Error('SerialPort does not open');
    }
    this.subscribers.forEach((f) => {
      this.serialPort.off('data', f);
    });
    return new Promise((resolve, reject) => {
      this.serialPort.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
        this.serialPort = null;
      });
    });
  }
}
