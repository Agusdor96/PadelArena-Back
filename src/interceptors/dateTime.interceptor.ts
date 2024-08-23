import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import {  Observable } from "rxjs";

@Injectable()
export class TransformTime implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest()
        const {startTime, endTime, ...tournament} = req.body
        req.body = {
            startTime: `${tournament.startDate}T${startTime}:00`,
            endTime:`${tournament.startDate}T${endTime}:00`,
            ...tournament
        }
        
        return next.handle()
    }
}