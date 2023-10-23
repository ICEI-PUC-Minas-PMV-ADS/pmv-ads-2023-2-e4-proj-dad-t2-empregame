import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { Public } from '../../utils/decorators/is-public.decorator';
import { AuthRedefinirSenhaDto } from './dto/redefinir-senha.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() data: signInDto) {
    return this.authService.signIn(data);
  }

  @Post('redefinir-senha')
  @Public()
  async handle(@Body() data: AuthRedefinirSenhaDto) {
    await this.authService.redefinirSenha(data);

    return;
  }
}
