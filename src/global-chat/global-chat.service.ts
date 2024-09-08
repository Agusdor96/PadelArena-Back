import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Socket } from 'socket.io';

@Injectable()
export class GlobalChatService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Message)
        private messagesRespository: Repository<Message>
    ){}
    async findUserById (userId: string, client: Socket): Promise<User> {
        const user = await this.userRepository.findOne({where: {id: userId}})
        if(!user) throw new NotFoundException('No se encontró el usuario')
        await this.userRepository.update(userId, {clientId: client.id})
        const userUpdated = await this.userRepository.findOne({where: {id: userId}})
        return userUpdated
    }

    async findUserByClientID (clientId: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {clientId}})
        if(!user) throw new NotFoundException('No se encontró el usuario')
        return user
    }

    async saveMessage(message: Partial<Message>): Promise<void> {
        await this.messagesRespository.save(message)
    }

    async getAllMessages(){
        const dbMessages = await this.messagesRespository.find({
            order: {createdAt:"ASC"}, take:15, relations:{sender:true}
        })          
        const messages = dbMessages.map((oneMessage) =>({
            content: oneMessage.content,
            sender: oneMessage.sender.name
        }))
        return messages
    }
}
