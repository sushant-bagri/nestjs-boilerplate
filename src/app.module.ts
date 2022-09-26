import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';
import { AppConfigService } from './shared/services/app.config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (appConfigService: AppConfigService) => appConfigService.getMongoConfig,
      inject: [AppConfigService],
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
