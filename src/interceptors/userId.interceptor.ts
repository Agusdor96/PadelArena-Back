import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserIdINterceptor implements NestInterceptor{
    constructor(private readonly jwtService: JwtService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(" ")[1];
        const paramsId = request.params.userId;
        const decriptedToken = this.jwtService.decode(token);
       
        if(paramsId != decriptedToken.id){
            throw new UnauthorizedException(`Unauthorized. userLogged id does not match params Id`);
        }
        return next.handle();
    }
}