import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ENV, utils } from '@app/common';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { User } from 'src/users/schemas';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { VerifyEmailDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const verificationCode = utils.generateRandomNumberString(6);
      await this.usersService.create({ ...registerDto, verificationCode });

      // Here we should should have sent verification code in email to user
      return { verificationCode };
    } catch (error) {
      throw new ConflictException();
    }
  }

  async verifyEmail(response: Response, verifyEmailDto: VerifyEmailDto) {
    const user = await this.usersService.findOneAndUpdate(verifyEmailDto, { isEmailVerified: true });
    if (!user) throw new BadRequestException();
    return await this.login(user, response);
  }

  async login(user: User, response: Response) {
    const currentTime = new Date().toString();

    await this.usersService.updateOne({ _id: user._id }, { $set: { lastLoginAt: currentTime } });

    // We can use more information to make it secure
    const tokenPayload: ITokenPayload = {
      userId: user._id.toString(),
      createdAt: currentTime,
    };

    const token = this.jwtService.sign(tokenPayload, { expiresIn: ENV.JWT_EXPIRATION });

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + Number(ENV.JWT_EXPIRATION));

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
