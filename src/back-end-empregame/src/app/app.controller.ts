import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../utils/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('version')
  getHello(): { version: string; description: string } {
    return this.appService.getHello();
  }
}
