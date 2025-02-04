import {User} from "./User";

export interface UserRepository {
  findByUsernameAndPassword(username: string, password: string): User | null;
}