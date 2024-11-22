export interface User {
    user:string, 
    email:string, 
    permission:number, 
    verified:boolean,
    jwt: any
}

export interface SessionUser {
    session: User
}
