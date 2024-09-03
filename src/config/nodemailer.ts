import * as nodemailer from 'nodemailer'
import {config as DotenvConfig} from 'dotenv'

DotenvConfig({path: '.env.development'})

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'arenapaddle@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
})

