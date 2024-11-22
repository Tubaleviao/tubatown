import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvironmentService {
    constructor(private configService: ConfigService){}

    getJwtSecret(){
      return this.configService.get('JWT_SECRET')
    }
    
    getJwtExpiresInSeconds(): number {
      return Number(this.configService.get<number>('JWT_EXPIRES_IN'))
    }
}
