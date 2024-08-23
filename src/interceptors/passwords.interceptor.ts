import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class PasswordInterceptor implements NestInterceptor{
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
        map((data)=> {
            if(Array.isArray(data)){
                return data.map((user)=>{
                    const {password, ...notPasswordUser} = user;
                    return notPasswordUser;
                })
            } else{
                const {password, passwordConfirm, ...partialUser} = data
                return partialUser;
            }
        })
    ) 
}
}