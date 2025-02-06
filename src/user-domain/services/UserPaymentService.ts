import {PaymentService} from "./PaymentService";
import {WithPayment} from "../entities/User";

export class UserPaymentService {
  constructor(
    private paymentService: PaymentService
  ) {
  }

  // Payments
  public paySubscription(paymentDetails: WithPayment, amount: number): void {
    this.paymentService.pay_amount(
      paymentDetails.card_number,
      paymentDetails.card_expiry_month + "/" + paymentDetails.card_expiry_year,
      paymentDetails.card_cvv,
      amount,
      "EUR"
    )
  }
}