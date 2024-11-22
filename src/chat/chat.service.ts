import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    
    constructor(private prisma: PrismaService) {}
    
    saveChat(data): Promise<Chat>{
    return this.prisma.chat.create({ data })
    }

    getChats(room): Promise<Chat[]>{
    return this.prisma.chat.findMany({where: {room}})
    }
}
