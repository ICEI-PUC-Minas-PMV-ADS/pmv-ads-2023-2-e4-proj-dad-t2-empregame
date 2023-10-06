import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { IS_PUBLIC_KEY } from '../../utils/decorators/is-public.decorator';
import { AppError } from '../../utils/app-error';
import { IAuthUser } from '../../utils/decorators/auth.decorator';

@Injectable()
export class RedisGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const contextArgs = context.getArgs()[0];
    const bearerToken: string = contextArgs.headers['authorization'];

    if (!bearerToken) throw new AppError('Token inválido', 403);

    const partsToken = bearerToken.split(' ');

    // valida se token e bearer existem
    if (partsToken.length !== 2) throw new AppError('Token inválido', 403);

    const [scheme, token] = partsToken;

    if (!/^Bearer$/i.test(scheme)) throw new AppError('Token inválido', 403);

    if (token) {
      const user: IAuthUser = JSON.parse(await this.redis.get(token));

      if (!user) throw new AppError('Usuário não autenticado', 401);

      contextArgs.user = user;

      return true;
    }

    throw new AppError('Token inválido', 403);
  }
}
