import { CanActivate, ConflictException, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEnum } from "src/user/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>("roles",[
            context.getHandler(), context.getClass()
        ])
        if(!requiredRoles){
            throw new ConflictException("Error en el intento de obtener el rol definido desde getHandler y getClass")
        }

        const request = context.switchToHttp().getRequest()
        console.log(request.user);
        
        
        return
    }
}