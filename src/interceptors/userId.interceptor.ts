import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserIdINterceptor implements NestInterceptor{
    constructor(private readonly jwtService: JwtService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers["authorization"]){
            throw new BadRequestException ("Falta la autorizacion en el header de la request")
          }  

        const token = request.headers.authorization.split(" ")[1];
        if(!token){
            throw new BadRequestException("No se encontro el Bearer token")
        }
        
        const paramsId = request.params.userId;
        const decriptedToken = this.jwtService.decode(token);
       
        if(paramsId != decriptedToken.id){
            throw new UnauthorizedException(`No autorizado. Los usuarios deben coincidir`);
        }
        return next.handle();
    }
}