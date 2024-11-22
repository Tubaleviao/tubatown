import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { EnvironmentService } from './environment/environment.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { PlayerModule } from './player/player.module';
import { NotesModule } from './notes/notes.module';

@Module({
  controllers: [AppController],
  providers: [ConfigService, JwtService, EnvironmentService, AppService, PrismaService, AuthService],
  imports: [ChatModule, PlayerModule, NotesModule],
})
export class AppModule { }
