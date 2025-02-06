import {UserRepository} from "./UserRepository";
import {User} from "../entities/User";

export class UserService {
  constructor(
    private userRepository: UserRepository,
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
}