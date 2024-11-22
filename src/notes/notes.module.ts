import { Module } from '@nestjs/common';
import { NotesGateway } from './notes.gateway';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [NotesGateway, NotesService, PrismaService],
  controllers: [NotesController]
})
export class NotesModule {}
