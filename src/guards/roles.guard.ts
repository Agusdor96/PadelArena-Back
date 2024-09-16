import { CanActivate, ConflictException, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEnum } from "../user/roles.enum";

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
        const user = request.user
        
        const hasRole = () => requiredRoles.some((role) => user?.asignRole?.includes(role));

        const access = user && user.asignRole && hasRole()
        
        if(!access){
            throw new ForbiddenException("Se necesita permiso para acceder a esta ruta")
        }
        return access;
    }
}