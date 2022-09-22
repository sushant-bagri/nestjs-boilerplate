import { Controller, Get } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ){}

  @Get()
  @HealthCheck()
  public async health(){
    return this.healthCheck.check([() => this.typeOrmHealthIndicator.pingCheck('postgres')])
  }
}