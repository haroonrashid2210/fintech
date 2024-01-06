import { Injectable } from '@nestjs/common';
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

  async validate({ userId }: ITokenPayload) {
    return await this.userService.findOne({ _id: userId });
  }
}
