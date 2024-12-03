import { Injectable } from '@nestjs/common';
import { Notes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
    
  constructor(private prisma: PrismaService) {}

  async getNotes(user): Promise<Notes[]>{
    return this.prisma.notes.findMany({where: {user}})
  }

  async saveNote(data): Promise<Notes>{
    return this.prisma.notes.create({data})
  }
}
