import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ENV } from '@app/common';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../../../src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request | any) => request?.cookies?.Authentication]),
      secretOrKey: ENV.JWT_SECRET,
    });
  }

  async validate(token: ITokenPayload) {
    const user = await this.userService.findOne({ _id: token.userId });
    if (new Date(token.createdAt).getMilliseconds() < new Date(user.lastLoginAt).getMilliseconds()) {
      throw new UnauthorizedException('Session expired');
    }
    return user;
  }
}
