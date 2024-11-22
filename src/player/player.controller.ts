import { Controller, Get, Param, Render, Req, UseGuards } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { readdir, stat } from 'fs/promises'
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionUser } from 'src/interfaces/user.interface';


const dirSize = async directory => {
    const files = await readdir( directory )
    const stats = files.map( file => stat( join( directory, file ) ) )
    let redFunc = ( accumulator, { size } ) => accumulator + size
    return ( await Promise.all( stats ) ).reduce( redFunc, 0 )
  }

@Controller('player')
export class PlayerController {

  @UseGuards(AuthGuard)
  @Get('')
  @Render('player')
  async getPlayer(@Req() req: Request & SessionUser, @Param('user') user): Promise<object> {
    let dir = join(__dirname, '../../public/users/', req.session.user)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    let date = new Date()
    let data: any = { title: 'Player', token: 'none' }
    data.owner = user ? false : true
    data.user = user ?? req.session.user
    let visit = { ip: '0', date: date.getTime(), user: req.session.user, page: "player" }
    data.musics = await readdirSync(dir)
    let folderSize = await dirSize(dir)
    data.size = (folderSize / 1024 / 1024).toFixed(2)
    data.permission = req.session.permission
    data.token = req.session.jwt
    return data
  }

}
