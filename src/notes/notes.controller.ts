import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { SessionUser } from 'src/interfaces/user.interface';

@Controller('notes')
export class NotesController {
    nav = ["chat", "player", "shooter", "notes", "webcam_face_detection", 
        "hibo", "money", "clock"]

    @Get()
    @Render('notes')
    async getNotes(@Req() req: Request & SessionUser){
        
        //let notes = mongo.notes
        return {title: "Notes", user: req.session.user, nav: this.nav}
    }
}
