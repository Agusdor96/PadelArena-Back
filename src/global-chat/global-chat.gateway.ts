import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GlobalChatService } from "./global-chat.service";

@WebSocketGateway({cors: {origin: '*'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly chatService: GlobalChatService,
    ){}
    @WebSocketServer()
    server: Server

    async handleConnection(client: Socket) {
        const userid = client.handshake.query.userid
        const user = await this.chatService.findUserById(String(userid), client)
        console.log(`${user.name} se ha conectado con éxito`);
    }

    handleDisconnect(client: Socket) {
        console.log('cliente desconectado', client.id);
        //se ejecuta cuando alguien se desconecta
    }

    @SubscribeMessage('message')
    async handleIncommingMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket){
      const user = await this.chatService.findUserByClientID(client.id)
      const newMessage = {
            content: message,
            sender: user
        }
        await this.chatService.saveMessage(newMessage)
        client.broadcast.emit('message', {message, from: user.name})
    }

}