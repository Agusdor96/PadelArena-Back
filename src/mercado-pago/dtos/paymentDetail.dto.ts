
export class PaymentDetailDto {
    preference_id:string
    payment: string
    status: string
    date_created: string
    date_last_update?: string
    transaction_amount: number
    payment_method_id: string
    payment_type_id:string
}