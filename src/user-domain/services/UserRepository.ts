import {User} from "../entities/User";
import {UserV2} from "../entities/UserV2";

export interface UserRepository {
  findByUsernameAndPassword(username: string, password: string): User | null;

  findById(userId: string): User | null;

  findByIdV2(userId: string): UserV2 | null;
}