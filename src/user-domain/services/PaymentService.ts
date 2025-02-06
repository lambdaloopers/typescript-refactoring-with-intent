export interface PaymentService {
  pay_amount(card_number: string, card_expiry_date: string, card_cvv: string, amount: number, currency: string): void;
  card_is_valid(card_number: string, card_expiry_date: string, card_cvv: string): boolean;
}