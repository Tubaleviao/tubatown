import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from './auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}
  
  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
  //   const jwt = this.extractToken(request) ?? request.Body?.accessToken
  //   let payload = jwt ? await this.authService.verifyJwt(jwt) : false
  //   if(!payload) context.switchToHttp().getResponse().redirect('/')
  //   return payload
  // }

  // private extractToken(request){
  //   const jwt = request.session?.jwt
  //   return jwt
    return request.session.user
  }
}
