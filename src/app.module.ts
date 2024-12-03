import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { PlayerModule } from './player/player.module';
import { NotesModule } from './notes/notes.module';
import { EnvironmentModule } from './environment/environment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [ConfigService, JwtService, AppService, PrismaService],
  imports: [ChatModule, PlayerModule, NotesModule, EnvironmentModule, AuthModule],
})
export class AppModule { }
