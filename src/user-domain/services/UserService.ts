import {UserRepository} from "./UserRepository";
import {User, WithPayment} from "../entities/User";
import {EmailService} from "./EmailService";
import {PaymentService} from "./PaymentService";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private paymentService: PaymentService
  ) {
  }

  // Autenticación
  public login(username: string, password: string): boolean {
    const user: User | null = this.userRepository.findByUsernameAndPassword(username, password);

    if (user == null) {
      return false;
    }

    if (user.blocked_at == null) {
      return false;
    }

    return true;
  }

  // Mailing
  public send_welcome_email(user: User): void {
    if (! this.is_valid_email(user.email)) {
      return;
    }

    this.emailService.sendEmail(user.email, "Welcome " + user.full_name + "!", "Welcome to our website.");
  }

  // Mailing
  public send_marketing_email(user: User): void {
    if (! this.is_valid_email(user.email)) {
      return;
    }

    if (! user.can_send_marketing_email) {
      return;
    }

    this.emailService.sendEmail(user.email, "This month news just for you " + user.full_name + "!", "...");
  }

  // Payments
  public pay_subscription(user: WithPayment, amount: number): void {
    this.paymentService.pay_amount(
      user.card_number,
      user.card_expiry_month + "/" + user.card_expiry_year,
      user.card_cvv,
      amount,
      "EUR"
    )
  }

  private is_valid_email(email: string): boolean {
    return email.includes("@");
  }

  public find_by_id(userId: string): User | null {
    return this.userRepository.findById(userId);
  }
}