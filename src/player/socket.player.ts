import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets"
import upio from "up.io"
import { rename, existsSync, unlink } from "node:fs"
import { join } from "node:path"
//import getSize from 'fast-folder-size'
const getSize = import('get-folder-size')
import { promisify } from 'node:util'
import { AuthService } from "src/auth/auth.service"
import { PlayerService } from "./player.service"


@WebSocketGateway({ namespace: 'player' })
export class SocketPlayerGateway implements OnGatewayConnection, OnGatewayDisconnect {
    user
    user_url
    token
    uploader
    constructor( private readonly playerService: PlayerService, private authService: AuthService ) {
        this.uploader = new upio()
        this.uploader.dir = "/public/tmp"
    }

    handleConnection(socket: any, ...args: any[]) {
        this.uploader.listen(socket)
    }
    handleDisconnect(socket: any) {}

    @SubscribeMessage('setUser')
    async setUser(@MessageBody() obj: any, @ConnectedSocket() socket: any){
        this.user_url = obj.user_url
        this.user = obj.user
        this.token = obj.token
    }

    @SubscribeMessage('delete')
    async delete(@MessageBody() music: any, @ConnectedSocket() socket: any){
        unlink(join(__dirname, `../../public/${this.user_url}/${music}`), err => {
            if (err) console.log(err)
        })
    }

    @SubscribeMessage('up_progress')
    async uploadProgress(@MessageBody() event: any, @ConnectedSocket() socket: any){
        socket.emit("attMusicProgress", {
            id: event.id,
            music: event.music,
            size: (event.size / 1024 / 1024).toFixed(2),
            loaded: (event.loaded / 1024 / 1024).toFixed(2)
        })
    }

    @SubscribeMessage('up_completed')
    async uploadCompleted(@MessageBody() event: any, @ConnectedSocket() socket: any){
        event.id = event.file_id
        event.music = event.file_name
        if (event.success) {
            let oldDir = join(__dirname, `../../public/tmp/${event.music}`)
            let newDir = join(__dirname, `../../public/${this.user_url}/${event.music}`)
            rename(oldDir, newDir, err => err && console.log(err))
            console.log(`user: ${this.user_url}, song: ${event.music}`)
        }
        socket.emit('deleteMusicProgress', event)
    }

    @SubscribeMessage('error')
    async error(@MessageBody() event: any, @ConnectedSocket() socket: any){
        console.log(event.file.name + " - " + event.memo)
        unlink(`./public/tmp/${event.file.name}`, err => err && console.log(err))
    }

    @SubscribeMessage('up_started')
    async uploadStarted(@MessageBody() event: any, @ConnectedSocket() socket: any){
        let targetFolder = join(__dirname, `../../public/${this.user_url}`)
        
        let getSizeClass = await getSize
        const size = await getSizeClass.default.loose(targetFolder)
        let dirSize = size ? (size / 1024 / 1024 / 1024).toFixed(2) : "0"
        const comming = await this.authService.verifyJwt(this.token)
        if (comming.username === this.user) {
            let { permission } = await this.playerService.getUserPermission(this.user)
            if (+dirSize > permission) {
                socket.emit('up_abortOne', event.id);
            } else {
                socket.emit('addMusicProgress', {
                    exists: false,
                    id: event.id,
                    music: event.file,
                    size: (event.size / 1024 / 1024).toFixed(2),
                    loaded: 0
                })
            }
        }
        else socket.emit('up_abortOne', event.id)
    }
}

