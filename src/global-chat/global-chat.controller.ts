import { Controller, Get} from "@nestjs/common";
import { GlobalChatService } from "./global-chat.service";
import { ApiTags } from "@nestjs/swagger";
import { CustomChat } from "src/decorators/controllerDecorators/chatController.decorator";

@ApiTags("CHAT")
@Controller('/chat')
export class ChatController{
    constructor(
        private readonly chatService: GlobalChatService
    ){}

    @Get()
    @CustomChat()
    getChat(){
        return this.chatService.getAllMessages()
    }
}