import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EnvironmentService } from 'src/environment/environment.service'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'

type GenerateJwtProps = {
  accessToken: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private environmentService: EnvironmentService,
  ) {}

  async generateJwt(user: User): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync(user, {
      secret: this.environmentService.getJwtSecret()
    })
    return { accessToken }
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.environmentService.getJwtSecret(),
    })
  }
}