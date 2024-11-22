import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SocketChatGateway } from './chat.socket';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatService, SocketChatGateway, PrismaService],
  controllers: [ChatController]
})
export class ChatModule {}
