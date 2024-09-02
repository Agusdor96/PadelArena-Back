import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HeaderInterceptor implements NestInterceptor{
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()
    req.body = {
        url: req.url,
        ...req.body
    }
    return next.handle()
}
}
    // req.body = {
    //     xSignature: req.headers['x-signature'],
    //     xRequestId: req.headers['x-request-id'],
    //     ...req.body
    // }