import { applyDecorators, UseGuards} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { SwaggerGetMessages } from "../SwaggerDecorators/Chat.decorator";

export function CustomChat(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetMessages(),
        UseGuards(AuthGuard),
    )
}