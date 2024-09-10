import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserIdINterceptor implements NestInterceptor{
    constructor(private readonly jwtService: JwtService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers["authorization"]){
            throw new BadRequestException("Falta la autorizacion en el header de la request (Interceptor)")
          }  

        const token = request.headers.authorization.split(" ")[1];
        if(!token){
            throw new BadRequestException("No se encontro el Bearer token")
        }

        const paramsId = request.params.id || request.params.userId;
        const decriptedToken = this.jwtService.decode(token);

        console.log(request.params);
        if(paramsId){
            if(paramsId != decriptedToken.id){
                throw new UnauthorizedException(`No autorizado. (params)`);
            }
            
        } else{
           const bodyId = request.body.user
            if(bodyId != decriptedToken.id){
               throw new UnauthorizedException(`No autorizado. (Body)`);
           }
        }   

        return next.handle();
    }
}