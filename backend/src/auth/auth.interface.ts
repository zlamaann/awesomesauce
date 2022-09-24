import User from "../user/user.entity";
import { Request } from 'express';

export interface RequestUser extends Request {
    user: User;
  }

export interface Token {
  userId: number;
}