import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators/core'
import { Request, Response } from 'express'
import { UsersService } from 'src/users/users.service'
import { Routes, Services } from 'src/utils/constants'
import { LoginDto } from './dto/login.dto'

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.USERS) private usersService: UsersService) {}

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const loginDto = req.body as LoginDto

        return res.status(HttpStatus.OK).json({
            user: await this.usersService.findUserByEmail(loginDto)
        })
    }
}
