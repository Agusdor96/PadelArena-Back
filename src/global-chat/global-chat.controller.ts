import { Controller, Get } from "@nestjs/common";
import { GlobalChatService } from "./global-chat.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("CHAT")
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