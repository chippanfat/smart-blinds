import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlModule } from './control/control.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'smart',
      user: 'root',
      pass: 'example',
    }),
    ControlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
