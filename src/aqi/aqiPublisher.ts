import { Injectable } from '@nestjs/common';
import { AqiService } from './aqi.service';
import { ISensorReading } from './aqiSensor';
import { EventService } from '../event/event.service';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class AqiPublisher {
  private _started: boolean = false;

  constructor(
    private readonly aqiService: AqiService,
    private readonly eventService: EventService,
    private readonly environmentService: EnvironmentService,
  ) {
    aqiService.on('reading', data => {
      this.publish(data);
    });
  }

  public start() {
    this._started = true;

    // tslint:disable-next-line: no-console
    console.log('AqiPublisher started successfully!');
  }

  public publish(sensorData: ISensorReading) {
    if (this._started) {
      // Add source and type of event
      const event = {
        source: this.environmentService.getLocalIPAddress(),
        type: 'aqi',
        data: sensorData,
      };
      this.eventService.publish('aqi', Buffer.from(JSON.stringify(event)));
    }
  }
}
