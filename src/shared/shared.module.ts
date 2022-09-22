import { Module } from "@nestjs/common";
import { AppConfigService } from "./services/app.config.service";


const providers = [
  AppConfigService
]
@Module({
  imports:[],
  providers: [...providers],
  exports: [...providers]
})
export class SharedModule{}