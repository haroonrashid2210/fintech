import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ENV } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: ENV.JWT_SECRET,
      signOptions: {
        expiresIn: ENV.JWT_EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
