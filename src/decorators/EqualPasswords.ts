import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";


export const PasswordsCompare = createParamDecorator(
    (data:Partial<User>, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest()
        const user = req.body
        const {password, passwordConfirm, ...UserDesestructured} = user
        if(password === passwordConfirm) {
            return req.body
        }else {
            throw new BadRequestException('Las contraseñas deben ser iguales')
        }

    }
)
