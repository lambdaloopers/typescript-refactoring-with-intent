import {User} from "../entities/User";
import {EmailService} from "./EmailService";

export class UserService {
  constructor(
    private emailService: EmailService,
  ) {
  }

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

  private is_valid_email(email: string): boolean {
    return email.includes("@");
  }
}