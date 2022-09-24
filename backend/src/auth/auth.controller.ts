import { Body, Controller, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { LocalAuthGuard } from "./local.guard";
import { RequestUser } from "./auth.interface";
import { AuthService } from "./auth.service";
import JwtAuthGuard from "./jwt.guard";
import { CreateUserDto } from "../user/user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestUser, @Res({ passthrough: true }) response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieLogin(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: RequestUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieLogout());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticate(@Req() request: RequestUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}