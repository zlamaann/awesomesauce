import { Body, Controller, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { LocalAuthGuard } from "./local.guard";
import { RequestUser } from "./auth.interface";
import { AuthService } from "./auth.service";
import JwtAuthGuard from "./jwt.guard";
import { CreateUserDto, RequestUser as RequestUserDto } from "../user/user.dto";
import { ApiBadRequestResponse, ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import User from "../user/user.entity";

@ApiTags('Authentication')
@ApiCookieAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
  @Post('register')
  @ApiOkResponse({ description: 'User successfully registered' })
  @ApiCreatedResponse({ description: 'User successfully created.', type: User, })
  @ApiBadRequestResponse({ description: 'User with that email already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User successfully logged in' })
  @ApiBadRequestResponse({ description: 'Wrong credentials provided' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  @ApiBody({ type: RequestUserDto })
  async login(@Req() request: RequestUser, @Res({ passthrough: true }) response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieLogin(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'User successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async logout(@Req() request: RequestUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieLogout());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: 'User successfully authenticated' })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async authenticate(@Req() request: RequestUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}