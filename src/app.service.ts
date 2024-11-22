import { Injectable } from '@nestjs/common';
import { Chat, User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getUser(username): Promise<User>{
    return this.prisma.user.findUnique({where: {username}})
  }

  async addUser(signupObject: SignupDto): Promise<User>{
    const { password, username, email } = signupObject
    let passwordHash = await bcrypt.hash(password, 10)
    return this.prisma.user.create(
      { data: {username, email, password: passwordHash, date: new Date().getTime(), permission: 1}}
    )
  }
  
}
