import { Controller, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { RegisterDto } from './dto/Register.dto'
import { UsersService } from './users.service'

@Controller(Routes.USERS)
export class UsersController {
    constructor(@Inject(Services.USERS) private usersService: UsersService) {}

    @Post('register')
    async register(@Req() req: Request, @Res() res: Response) {
        const registerDto = req.body as RegisterDto

        return res.status(HttpStatus.OK).json({
            user: await this.usersService.createUser(registerDto)
        })
    }
}
