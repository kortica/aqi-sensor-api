import * as os from 'os';
import { Injectable } from '@nestjs/common';
import { ISensorNode, SensorNodeStatus } from './environment';

@Injectable()
export class EnvironmentService {
  public getNodeUpdate(): ISensorNode {
    const nodeUpdate: ISensorNode = {
      pid: process.pid,
      hostname: os.hostname(),
      ipAddress: this.getLocalIPAddress(),
      status: SensorNodeStatus.UP,
      timestamp: Date.now(),
    };
    return nodeUpdate;
  }

  public mergeIncomingUpdate(data: any) {
    const msg = JSON.parse(data);
    if (msg.pid === process.pid) {
      return;
    }

    // tslint:disable-next-line: no-console
    console.log(msg.pid + ': ' + new Date(msg.timestamp));
  }

  public getLocalIPAddress(): string {
    const networkInterfaces: any = os.networkInterfaces();
    const validInterfaces = Object.keys(networkInterfaces).filter(
      index => index !== 'lo',
    );
    const defaultInterface = networkInterfaces[validInterfaces[0]].filter(
      obj => obj.family === 'IPv4',
    )[0];

    return defaultInterface.address;
  }
}
