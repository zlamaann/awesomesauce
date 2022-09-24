import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import JwtAuthGuard from "./jwt.guard";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
      UserModule, 
      PassportModule, 
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`
          }
        })
      })  
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController]
  })
  export class AuthModule {}