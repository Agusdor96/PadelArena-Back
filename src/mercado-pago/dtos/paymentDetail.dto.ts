
export class PaymentDetailDto {
    payment_id: string
    status: string
    date_created: string
    date_last_updated?: string
    date_approved?: string
    transaction_amount: number
}