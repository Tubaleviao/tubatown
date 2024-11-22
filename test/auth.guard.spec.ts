import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from './../src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  it('should be defined', () => {
    // expect(new AuthGuard(
    //   new AuthService(
    //     new JwtService(), new AppService(
    //       new PrismaService(), new ConfigService()
    //     )
    //   )
    // )).toBeDefined();
  });
});
