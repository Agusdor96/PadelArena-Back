import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly JWTservice: JwtService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        if(!request.headers["authorization"]){
            throw new BadRequestException ("Falta la autorizacion en el header de la request (Guard)")
          }  
        const token = request.headers["authorization"].split(" ")[1]
        if(!token){
            throw new BadRequestException("No se encontro el Bearer token")
        }
    
        try{
            const secret = process.env.JWT_SECRET
            const userPayload = this.JWTservice.verify(token,{secret})
           
            
            if(userPayload.role === "admin"){
                userPayload.asignRole = ["admin"]
            } else{
                userPayload.asignRole = ["jugador"]
            }
            request.user = userPayload;
            return true;

        } catch (err){
            throw new UnauthorizedException("Token invalido (guard)")
        }
    }
}