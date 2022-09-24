import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Token } from "./auth.interface";
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  
  public async register(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      let user = await this.userService.create({
        ...data,
        password: hashedPassword
      });
      user.password = undefined;
      return user;
    } catch (error) {
      if (error?.code === '23505') { //unique violation
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  public async login(email: string, password: string) {
      try {
        const user = await this.userService.getByEmail(email);
        await this.verifyPassword(password, user.password);
        user.password = undefined;
        return user;
      } catch (error) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }
      
  private async verifyPassword(plainPassword: string, hashedPassword: string) {
      const isPasswordMatching = await bcrypt.compare( plainPassword, hashedPassword );
      if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
  }

  public getCookieLogin(userId: number) {
      const payload: Token = { userId };
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieLogout() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
  }

  