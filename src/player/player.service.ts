import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
    
    constructor(private prisma: PrismaService) {}

    getUserPermission(username): Promise<{ permission: number; }>{
        return this.prisma.user.findUnique({select: {permission: true}, where: {username}})
      }
}
