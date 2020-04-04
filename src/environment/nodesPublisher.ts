import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { ISensorNode } from './environment';
import { EnvironmentService } from './environment.service';

@Injectable()
export class NodesPublisher {
  private _started: boolean = false;

  constructor(
    private readonly eventService: EventService,
    private readonly environmentService: EnvironmentService,
  ) {}

  public start() {
    this._started = true;

    // Send a regular update to the other nodes
    setInterval(() => {
      const nodeUpdate = this.environmentService.getNodeUpdate();
      this.publish(nodeUpdate);
    }, 10000);

    // Also register a subscriber to get notified for other node's updates
    this.eventService.subscribe('node', this.onUpdate);
  }

  public publish(sensorData: ISensorNode) {
    if (this._started) {
      this.eventService.publish(
        'node',
        Buffer.from(JSON.stringify(sensorData)),
      );
    }
  }

  public onUpdate(event: any) {
    const sensorData: ISensorNode = event as ISensorNode;

    // tslint:disable-next-line: no-console
    console.log(`[onUpdate] Received event ${sensorData}`);
  }
}
