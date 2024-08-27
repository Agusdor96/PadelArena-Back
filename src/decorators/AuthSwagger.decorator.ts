import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SwaggerGoogleAuth() {
    return applyDecorators(
        ApiOperation({
            
            summary: "User registration",
            description:"Allows a new user to signUp providing all the required fields by LoginUserDto which is an extension from CreateUserDto. In this instance users password will be hashed for secutiry."
        }),
        ApiResponse({status:201, description: "user registered succesfully with id:userId"}),
        ApiResponse({status: 400, description: "Bad Request"})
    )
}