import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [AppController],
  providers: [AppService, SocketGateway, PrismaService],
  imports: [SocketModule],
})
export class AppModule { }
