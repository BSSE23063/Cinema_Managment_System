import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { RolesModule } from 'src/roles/roles.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { RoleGuard } from './role.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UsersModule
    ,RolesModule
    ,BlacklistModule
  ],
  providers: [AuthService,JwtStrategy,RoleGuard],
  controllers: [AuthController],
  exports: [AuthService,RoleGuard,JwtModule],
})
export class AuthModule {}
