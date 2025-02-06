import {UserService} from "./services/UserService";
import {User} from "./entities/User";
import {UserPaymentService} from "./services/UserPaymentService";
import {UserRepository} from "./services/UserRepository";
import {UserV2} from "./entities/UserV2";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UserController {
  constructor(
    private userService: UserService,
    private userPaymentService: UserPaymentService,
    private userRepository: UserRepository
  ) {
  }

  public pay(userId: string, amount: number): void {
    const user: User | null = this.userService.find_by_id(userId);

    if (user == null) {
      return;
    }

    this.userService.pay_subscription(user, amount);
  }

  public payV2(userId: string, amount: number): void {
    const user: UserV2 | null = this.userRepository.findByIdV2(userId);

    if (user == null) {
      return;
    }

    this.userPaymentService.paySubscription(user.paymentDetails, amount);
  }
}