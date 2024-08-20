import{NextFunction, Request, Response} from "express"

export function loggerGlobal(req:Request, res:Response, next: NextFunction){
    const now = new Date()
    const localDateTime = now.toLocaleString()
        console.log(`Ejecutando ${req.method} ${req.url}, ${localDateTime}`);
    next()
}