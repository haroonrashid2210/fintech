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

  /**
   * The register function generates a verification code, creates a new user with the provided
   * registration data and the generated verification code, and returns the verification code.
   * @param {RegisterDto} registerDto - An object containing the data needed to register a user. It
   * typically includes properties such as username, email, and password.
   * @returns an object with the verification code.
   */
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

  /**
   * The function verifies the email of a user and logs them in if successful.
   * @param {Response} response - The "response" parameter is an object that represents the HTTP
   * response that will be sent back to the client. It is used to send the response after the email
   * verification process is completed.
   * @param {VerifyEmailDto} verifyEmailDto - An object containing the data needed to verify the email.
   * It typically includes properties like the user's email address and any verification tokens or
   * codes.
   * @returns the result of the `this.login(user, response)` function call.
   */
  async verifyEmail(response: Response, verifyEmailDto: VerifyEmailDto) {
    const user = await this.usersService.findOneAndUpdate(verifyEmailDto, { isEmailVerified: true });
    if (!user) throw new BadRequestException();
    return await this.login(user, response);
  }

  /**
   * The login function updates the last login time for a user, generates a JWT token with user
   * information, and sets a cookie with the token for authentication.
   * @param {User} user - The `user` parameter is an object that represents the user who is logging in.
   * It likely contains information such as the user's ID, username, email, and password.
   * @param {Response} response - The `response` parameter is an object that represents the HTTP
   * response that will be sent back to the client. It is typically used to set headers, cookies, and
   * send the response body.
   */
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
