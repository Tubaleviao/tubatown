import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { SessionUser } from 'src/interfaces/user.interface';

@Controller('chat')
export class ChatController {
  @Get('')
  @Render('chat')
  getChat(@Req() req: Request & SessionUser): object {
    return { title: 'Chat', ip: '0', user: req.session.user }
  }

  @Get('/:room')
  @Render('chat')
  getChatRoom(@Param('room') room: string, @Req() req: Request & SessionUser): object {
    return { title: 'Chat', ip: '0', user: req.session.user, room }
  }
}
