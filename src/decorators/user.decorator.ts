import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserSession = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        let {user, email, permission, verified, jwt} = request.session
        return {user, email, permission, verified, jwt}
} )
