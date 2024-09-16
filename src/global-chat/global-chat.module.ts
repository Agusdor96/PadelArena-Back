import { Module } from '@nestjs/common';
import { GlobalChatService } from './global-chat.service';
import { ChatGateway } from './global-chat.gateway';
import { User } from '../user/entities/user.entity';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './global-chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers:[ChatController],
  providers: [ChatGateway, GlobalChatService],
})
export class GlobalChatModule {}
