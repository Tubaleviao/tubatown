import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { SocketPlayerGateway } from './socket.player';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from 'src/environment/environment.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [ConfigService, PlayerService, SocketPlayerGateway, PrismaService, AuthService, JwtService, EnvironmentService],
    controllers: [PlayerController]
})
export class PlayerModule {}
