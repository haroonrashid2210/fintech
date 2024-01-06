import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule, AuthModule, MerchantsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
