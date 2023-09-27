import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'utils/app-error';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: signInDto): Promise<any> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email: email },
    });

    if (!usuario) throw new AppError('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, usuario.senha);

    if (!isMatch) throw new AppError('Credenciais inválidas');

    const payload = { sub: usuario.id, email: usuario.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
