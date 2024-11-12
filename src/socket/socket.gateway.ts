import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets"
import { AppService } from "src/app.service"
const usernames = []

@WebSocketGateway(undefined, { namespace: 'chat' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly appService: AppService,
      ) {}
    addedUser = false
    handleConnection(socket: any, ...args: any[]) {}
    handleDisconnect(socket: any) {
        console.log(`${socket.username} disconnected.`)
        let room_json;
        if (this.addedUser) {
            for (let i = 0; i < usernames.length; i++) {
                if (usernames[i].room == socket.room) {
                    room_json = usernames[i];
                    usernames[i].users.splice(usernames[i].users.indexOf(socket.username), 1);
                }
            }
            if(room_json) socket.broadcast.emit('refresh users', room_json)
            socket.emit('log', "You are disconnected. Please refresh the page")
        }
    }

    @SubscribeMessage('add user')
    async addUser(@MessageBody() data: any, @ConnectedSocket() socket: any){
        console.log(`${data.user} connected.`)
        let existe_user = false;
        let existe_room = false;
        let user_room, roomJson;
        if (data.room) {
            user_room = data.room;
        } else {
            user_room = "";
        }
        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i].room == user_room) {
                existe_room = true;
                roomJson = usernames[i];
            }
        }
        // [ {room: "tubaroom", users: ["tuba", "joão" , ...]}, {...} ]
        if (!existe_room) {
            roomJson = { room: user_room, users: [] }
            usernames.push(roomJson);
        }
        if (roomJson.users.indexOf(data.user) >= 0) {
            existe_user = true;
        }
        if (!existe_user) {
            socket.username = data.user
            socket.room = user_room
            roomJson.users.push(data.user);
            for (let i = 0; i < usernames.length; i++) {
                if (usernames[i].room == data.room) {
                    usernames[i].users = roomJson.users;
                }
            }
            this.addedUser = true
            roomJson.chats = await this.appService.getChats(user_room)
            socket.emit('login', {})
            socket.emit('refresh users', roomJson)
            socket.emit('display room', roomJson.chats)
            socket.broadcast.emit('refresh users', roomJson)
        } else {
            return { succeed: false }
        }
        return { succeed: true }
    }

    @SubscribeMessage('new message')
    async newMessage(
        @MessageBody() data: string,
        @ConnectedSocket() socket: any
    ) {
        const resp = {
            hora: (new Date()).getTime(),
            username: socket?.username,
            room: socket?.room,
            message: data
        };
        socket.broadcast.emit('new message', resp);
        socket.emit('new message', resp)
        if (resp.room) {
            await this.appService.saveChat(resp)
        }
    }

    @SubscribeMessage('blink')
    blink(
        @MessageBody() data: string,
        @ConnectedSocket() socket: any
    ) {
        socket.broadcast.emit('blink', data)
    }

}