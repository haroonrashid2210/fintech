import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/common';
import { User, UserSchema } from './schemas';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
