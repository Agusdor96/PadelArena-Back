import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class PasswordInterceptor implements NestInterceptor{
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    
    return next.handle().pipe(
        map((data)=> {
            if(Array.isArray(data)){
                return data.map((user)=>{
                    console.log("1", data);
                    
                    const {password, ...notPasswordUser} = user;
                    return notPasswordUser;
                })
            } else{
                console.log("2", data)
                const {password, passwordConfirm, role, ...partialUser} = data
                return partialUser;
            }
        })
    ) 
}
}