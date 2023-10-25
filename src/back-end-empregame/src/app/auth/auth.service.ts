import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/sign-in.dto';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AppError } from '../../utils/app-error';
import { AuthRedefinirSenhaDto } from './dto/redefinir-senha.dto';
import { BcryptService } from '../../utils/providers/bcrypt/bcrypt.service';

import { AuthUpdateSenhaDto } from './dto/update-senha.dto';
import { EmailsService } from '../../utils/providers/mail/email.service';

interface IContentCodigo {
  id_usuario: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mail: EmailsService,
    private bcrypt: BcryptService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async signIn({ email, password }: signInDto): Promise<any> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email: email },
    });

    if (!usuario) throw new AppError('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, usuario.senha);

    if (!isMatch) throw new AppError('Credenciais inválidas');

    const payload = { sub: usuario.id, email: usuario.email };

    const access_token = await this.jwtService.signAsync(payload);

    await this.redis.set(
      access_token,
      JSON.stringify({
        access_token,
        usuario: usuario,
      }),
      'EX',
      60 * 60 * 24 * 7, // 7 dias,
    );

    return { access_token, usuario };
  }

  async redefinirSenha({ email, codigo, senha }: AuthRedefinirSenhaDto) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!usuario) throw new AppError('Usuário não encontrado');

    if (!codigo) {
      const newCodigo = crypto.randomInt(100000, 1000000).toString();

      await this.redis.set(
        newCodigo,
        JSON.stringify({
          id_usuario: usuario.id,
        } as IContentCodigo),
        'EX',
        60 * 30, // 30 minutos
      );

      await this.mail.sendText({
        subject: 'Redefinição de senha',
        text: 'Segue o código de recuperação da senha: ' + newCodigo,
        to: usuario.email,
      });

      return;
    }

    const codigoExist = await this.redis.get(codigo);

    if (!codigoExist) throw new AppError('Código inválido');

    const contentCodigo = JSON.parse(codigoExist) as IContentCodigo;

    if (contentCodigo.id_usuario !== usuario.id)
      throw new AppError('Código inválido');

    const hash = await this.bcrypt.generateHash(senha);

    await this.prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        senha: hash,
      },
    });

    await this.redis.del(codigo);

    return;
  }

  async updateSenha(
    id_usuario: number,
    { senha_atual, senha_nova }: AuthUpdateSenhaDto,
  ) {
    if (senha_atual === senha_nova)
      throw new AppError('Senhas devem ser diferentes');

    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id: id_usuario,
      },
    });

    if (!usuario) throw new AppError('Usuário não encontrado');

    const isMatch = this.bcrypt.compare(senha_atual, usuario.senha);

    if (!isMatch) throw new AppError('Senha atual inválida');

    const hash = await this.bcrypt.generateHash(senha_nova);

    await this.prisma.usuario.update({
      where: {
        id: id_usuario,
      },
      data: {
        senha: hash,
      },
    });

    return;
  }
}
