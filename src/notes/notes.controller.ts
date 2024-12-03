import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SessionUser } from 'src/interfaces/user.interface';
import { NotesService } from './notes.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notes')
export class NotesController {
    nav = ["chat", "player", "shooter", "notes", "webcam_face_detection", 
        "hibo", "money", "clock"]
    
    constructor(private notesService: NotesService){}

    @Get()
    @UseGuards(AuthGuard)
    @Render('notes')
    async getNotes(@Req() req: Request & SessionUser){
        let notes = await this.notesService.getNotes(req.session.user)
        return {title: "Notes", user: req.session.user, nav: this.nav, notes}
    }
}
