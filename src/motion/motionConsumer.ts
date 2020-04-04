import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import * as moment from 'moment';

@Injectable()
export class MotionConsumer {
  constructor(private readonly eventService: EventService) {
    this.eventService.subscribe('motion', this.onMotion);
  }

  public async onMotion(content: any) {
    const data = JSON.parse(content);
    const isoDateTime = moment
      .unix(data.data.timestamp)
      .locale('en-CA')
      .utcOffset(0)
      .format('dddd, MMMM DD, YYYY - h:mm:ss A');

    // tslint:disable-next-line: no-console
    console.log(`[onMotion] Date of motion detect: ${isoDateTime}`);
  }
}
