import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class DEMO implements NestInterceptor{
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log(context.switchToHttp().getRequest());
    
    return next.handle().pipe(
        
    ) 
}
}