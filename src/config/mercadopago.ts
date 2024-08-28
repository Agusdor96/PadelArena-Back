import {config as dotenvConfig} from 'dotenv'
import {MercadoPagoConfig} from 'mercadopago'

dotenvConfig({path: '.env.development'})

export const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN })

