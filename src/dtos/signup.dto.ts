import { IsEmail } from 'class-validator'

export class SignupDto{
    username: string
    password: string

    @IsEmail()
    email: string
}

export class LoginDto{
    username: string
    password: string
}