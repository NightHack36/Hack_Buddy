import { UserStatus } from "../enums/UserStatus";

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  newPassword: string;
}

export interface UserTokenDetails {
  id: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  linkedInLink: string;
  githudLink: string;
  status: UserStatus;
  createdTime: number;
  updatedTime: number;
}
