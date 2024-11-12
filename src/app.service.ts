import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  saveChat(data): Promise<Chat>{
    return this.prisma.chat.create({ data })
  }

  getChats(room): Promise<Chat[]>{
    return this.prisma.chat.findMany({where: {room}})
  }
  
}
