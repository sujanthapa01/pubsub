import {ExecutionContext, createParamDecorator} from "@nestjs/common"


export interface CurrentUserPayload {
    id: string,
    email: string
}


export const CurrentUser = createParamDecorator((data:unknown,ctx: ExecutionContext) => {
const request = ctx.switchToHttp().getRequest()
return request.user
})