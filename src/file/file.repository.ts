import { Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'
import { UploadApiResponse } from "cloudinary";

@Injectable()
export class FileRepository{
    async uploadImage(
        file: Express.Multer.File
    ):Promise<UploadApiResponse> {
        return new Promise((resolve, reject)=> {
            const upload = v2.uploader.upload_stream(
                {resource_type:'auto'},
                (error, result)=> {
                    if(error) {
                        reject(error);
                    }else {
                        resolve(result)
                    }
                }
            )
            toStream(file.buffer).pipe(upload)
        })
    }
}