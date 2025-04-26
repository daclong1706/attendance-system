import { User } from "./userTypes";

export interface AuthResponse {
  access_token: string;
  user: User;
}
