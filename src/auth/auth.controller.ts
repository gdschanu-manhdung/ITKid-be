import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators/core'
import { ApiBody } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/Login.dto'

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private authService: AuthService) {}

    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const loginDto = req.body as LoginDto

        return res.status(HttpStatus.OK).json({
            user: await this.authService.validateUser(loginDto)
        })
    }
}
