import {UserRepository} from "./UserRepository";
import {User} from "./User";
import {EmailService} from "./EmailService";
import {PaymentService} from "./PaymentService";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private paymentService: PaymentService
  ) {
  }

  public login(username: string, password: string): boolean {
    const user: User | null = this.userRepository.findByUsernameAndPassword(username, password);

    let can_login: boolean;
    if (user == null) {
      can_login = false;
    } else if (user.blocked_at == null) {
      can_login = false;
    } else {
      can_login = true;
    }

    return can_login;
  }

  public send_welcome_email(user: User): void {
    if (! this.is_valid_email(user.email)) {
      return;
    }

    this.emailService.sendEmail(user.email, "Welcome " + user.full_name + "!", "Welcome to our website.");
  }

  public send_marketing_email(user: User): void {
    if (! this.is_valid_email(user.email)) {
      return;
    }

    if (! user.can_send_marketing_email) {
      return;
    }

    this.emailService.sendEmail(user.email, "This month news just for you " + user.full_name + "!", "...");
  }

  public pay_subscription(user: User, amount: number): void {
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
}