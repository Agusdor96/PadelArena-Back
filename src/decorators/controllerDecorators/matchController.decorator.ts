import { applyDecorators} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { SwaggerGetMatches } from "../SwaggerDecorators/Match.decorator";

export function CustomGetMatches(){
    return applyDecorators(
        SwaggerGetMatches(),
    )
}