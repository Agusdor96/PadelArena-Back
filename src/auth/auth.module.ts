import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { UserModule } from '../user/user.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, Category]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
