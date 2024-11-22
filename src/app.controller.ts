import { Body, Controller, Get, Param, Post, Render, UseGuards, Req, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginDto, SignupDto } from './dtos/signup.dto'
import { AuthService } from './auth/auth.service'
import * as bcrypt from 'bcrypt'
import { Request, Response as Res } from 'express'
import { SessionUser } from './interfaces/user.interface';

@Controller()
export class AppController {
  nav = ["chat", "player", "shooter", "notes", "webcam_face_detection", 
    "hibo", "money", "clock"]
  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  getHome(@Req() req: Request & SessionUser, @Response() res: Res): void {
    if(req.session.user) res.redirect("dashboard")
    else res.render('home', { title: 'Home', ip: '0'})
  }

  @Get('dashboard')
  @UseGuards(AuthGuard)
  @Render('dashboard')
  getDashboard(@Req() req: Request & SessionUser): object {
    return { title: 'Dashboard', user: req.session.user, nav: this.nav  }
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
        @Req() req: Request & SessionUser
      ): Promise<void> {
    let { password, username } = loginDto
    let databaseUser = await this.appService.getUser(username)
    if(databaseUser) {
      let passwordsMatch = await bcrypt.compare(password, databaseUser.password)
      if(passwordsMatch){
        let jwt = await this.authService.generateJwt(databaseUser)
        req.session.user = username
        req.session.email = databaseUser.email
        req.session.permission = databaseUser.permission
        req.session.verified = true
        req.session.jwt = jwt.accessToken
        if (req.body.url == "/") res.redirect("dashboard")
        else res.redirect(req.body.url)
      }
      else throw new Error("Password was not correct")
    }
    else throw new Error("User does not exists")
  }
}
