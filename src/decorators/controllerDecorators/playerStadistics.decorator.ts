import { applyDecorators, UseGuards} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { SwaggerGetStadistics } from "../SwaggerDecorators/Stadistics.decorator";
import { AuthGuard } from "src/guards/auth.guard";


export function CustomGetStadistics(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetStadistics(),
        UseGuards(AuthGuard)
    )
}