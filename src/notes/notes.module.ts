import { Module } from '@nestjs/common';
import { NotesGateway } from './notes.gateway';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { EnvironmentService } from 'src/environment/environment.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, ConfigService, EnvironmentService, NotesGateway, NotesService, PrismaService, AuthService],
  controllers: [NotesController]
})
export class NotesModule {}
