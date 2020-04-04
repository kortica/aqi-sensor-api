export enum SensorNodeStatus {
  UP,
  DOWN,
}

export interface ISensorNode {
  pid: number;
  hostname: string;
  ipAddress: string;
  status: SensorNodeStatus;
  timestamp: number;
}

export interface IEnvironment {
  sensorNodes: ISensorNode[];
}
