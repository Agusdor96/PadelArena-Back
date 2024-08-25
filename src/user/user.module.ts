import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Category])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
