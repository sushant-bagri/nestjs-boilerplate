import { Controller, Get } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private _healthCheck: HealthCheckService, private _mongooseHealth: MongooseHealthIndicator) {}


  @Get()
  @HealthCheck()
  public async health(){
    return this._healthCheck.check([() => this._mongooseHealth.pingCheck('mongoDB')])
  }
}