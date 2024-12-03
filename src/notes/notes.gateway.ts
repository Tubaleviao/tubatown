import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NotesService } from './notes.service';

@WebSocketGateway({ namespace: 'notes' })
export class NotesGateway {

  constructor(
    private readonly notesService: NotesService,
  ) {}

  @SubscribeMessage('save')
  async saveNote(client: any, payload: any): Promise<void> {
    client.emit('saved', await this.notesService.saveNote(payload))
  }
}
