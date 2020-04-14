import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AqiController } from './aqi/aqi.controller';
import { AqiService } from './aqi/aqi.service';
import { EventService } from './event/event.service';
import { ConfigService } from './config/config.service';
import { AqiPublisher } from './aqi/aqiPublisher';
import { MotionConsumer } from './motion/motionConsumer';

@Module({
  imports: [],
  controllers: [AppController, AqiController],
  providers: [AppService, AqiPublisher, AqiService, EventService, ConfigService, MotionConsumer],
})
export class AppModule {}
