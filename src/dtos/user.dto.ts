import { Expose } from 'class-transformer'

export class UserDto{
    @Expose()
    username: string

    password: string
    
    @Expose()
    email: string

    @Expose()
    date: number

    @Expose()
    permission: number
}
