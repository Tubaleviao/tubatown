import { Body, Controller, Get, Param, Post, Render, UseGuards, Req, Response, UseInterceptors, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginDto, SignupDto } from './dtos/signup.dto'
import { AuthService } from './auth/auth.service'
import * as bcrypt from 'bcrypt'
import { Request, Response as Res } from 'express'
import { UserDto } from './dtos/user.dto';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { UserSession } from './decorators/user.decorator';

@Controller()
export class AppController {
  nav = ["chat", "player", "shooter", "notes", "webcam_face_detection", 
    "hibo", "money", "clock"]
  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  getHome(@UserSession() user: any, @Response() res: Res): void {
    if(user.user) res.redirect("dashboard")
    else res.render('home', { title: 'Home', ip: '0'})
  }
  @Get('users/:id')
  @UseInterceptors(SerializeInterceptor)
  getUser(@Param('id') id): Promise<UserDto> {
    return this.appService.getUser(id)
  }

  @Get('dashboard')
  @UseGuards(AuthGuard)
  @Render('dashboard')
  getDashboard(@Session() session: any): object {
    return { title: 'Dashboard', user: session.user, nav: this.nav  }
  }
  
  @Post('signup')
  async sinup(@Body() signupDto: SignupDto): Promise<object> {
    let user = await this.appService.getUser(signupDto.username)
    if(user) throw new Error("User already exists")
    user = await this.appService.addUser(signupDto)
    return await this.authService.generateJwt(user)
  }
  
  @Post('login')
  async login(
        @Body() loginDto: LoginDto, 
        @Response() res: Res, 
        @Req() req: Request,
        @Session() session,
      ): Promise<void> {
    let { password, username } = loginDto
    let databaseUser = await this.appService.getUser(username)
    if(databaseUser) {
      let passwordsMatch = await bcrypt.compare(password, databaseUser.password)
      if(passwordsMatch){
        let jwt = await this.authService.generateJwt(databaseUser)
        session.user = username
        session.email = databaseUser.email
        session.permission = databaseUser.permission
        session.verified = true
        session.jwt = jwt.accessToken
        if (req.body.url == "/") res.redirect("dashboard")
        else res.redirect(req.body.url)
      }
      else throw new Error("Password was not correct")
    }
    else throw new Error("User does not exists")
  }
}
