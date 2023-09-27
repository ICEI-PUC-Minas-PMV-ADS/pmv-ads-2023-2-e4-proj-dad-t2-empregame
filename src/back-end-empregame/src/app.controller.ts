import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  getHello(): { version: string; description: string } {
    return this.appService.getHello();
  }
}
