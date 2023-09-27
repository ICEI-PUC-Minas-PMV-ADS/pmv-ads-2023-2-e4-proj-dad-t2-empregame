import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { version: string; description: string } {
    return {
      version: '1.0.0',
      description: 'EmpregaMe - Projeto 4° semestre ADS',
    };
  }
}
