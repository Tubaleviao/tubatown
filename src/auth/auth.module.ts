import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { EnvironmentModule } from 'src/environment/environment.module'
import { EnvironmentService } from 'src/environment/environment.service'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [],
  providers: [ConfigService, AuthService, JwtService, EnvironmentService],
  exports: [AuthService],
})
export class AuthModule {}