import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { Public } from '../../utils/decorators/is-public.decorator';
import { AuthRedefinirSenhaDto } from './dto/redefinir-senha.dto';
import { AuthUpdateSenhaDto } from './dto/update-senha.dto';
import { AuthUser, IAuthUser } from '../../utils/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  async redefinirSenha(@Body() data: AuthRedefinirSenhaDto) {
    await this.authService.redefinirSenha(data);

    return;
  }

  @ApiBearerAuth()
  @Post('update-senha')
  async updateSenha(
    @Body() data: AuthUpdateSenhaDto,
    @AuthUser() user: IAuthUser,
  ) {
    await this.authService.updateSenha(user.usuario.id, data);

    return;
  }
}
