import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('chat')
  @Render('chat')
  getChat(): object {
    return { title: 'Chat', ip: '0' };
  }

  @Get('chat/:room')
  @Render('chat')
  getChatRoom(@Param('room') room: string): object {
    return { title: 'Chat', ip: '0', room };
  }
}
