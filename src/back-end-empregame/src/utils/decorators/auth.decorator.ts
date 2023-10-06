import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthUser {
  token: string;
  usuario: {
    id: number;
    created_at: Date;
    updated_at: Date;
    nome: string;
    tipo: string;
    email: string;
    telefone: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
  };
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IAuthUser;
  },
);
