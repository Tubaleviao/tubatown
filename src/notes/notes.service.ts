import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
    
  constructor(private prisma: PrismaService) {}

  async getNotes(){
    //return this.prisma.notes.find()
  }
}
