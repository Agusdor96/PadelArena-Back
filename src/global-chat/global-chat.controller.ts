import { Controller, Get } from "@nestjs/common";
import { GlobalChatService } from "./global-chat.service";

@Controller('/chat')
export class ChatController{
    constructor(
        private readonly chatService: GlobalChatService
    ){}

    @Get()
    getChat(){
        return this.chatService.getAllMessages()
    }
}