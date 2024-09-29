import { applyDecorators } from "@nestjs/common";
import { SwaggerGoogleAuth, SwaggerLocalSignIn, SwaggerLocalSignUp } from "../SwaggerDecorators/Auth.decorator";

export function CustomLocalSignUp () {
    return applyDecorators(
        SwaggerLocalSignUp(),
    )
}

export function CustomLocalSignIn(){
    return applyDecorators(
        SwaggerLocalSignIn()
    )
}
    export function CustomGoogleSignIn(){
    return applyDecorators(
        SwaggerGoogleAuth()
    )
}