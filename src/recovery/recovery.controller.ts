import { Controller, Inject, Post, Req, Res } from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { UserDetails } from 'src/utils/types'
import { RecoveryService } from './recovery.service'
import { Request, Response } from 'express'
import { HttpStatus } from '@nestjs/common/enums'
import { ConfirmRecoveryDto } from './dto/ConfirmRecovery.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'

@Controller(Routes.RECOVERY)
export class RecoveryController {
    constructor(
        @Inject(Services.RECOVERY) private recoveryService: RecoveryService
    ) {}

    @ApiQuery({ name: 'email', required: false, type: String })
    @Post('recoveryAccount')
    async recoveryAccount(@Req() req: Request, @Res() res: Response) {
        const userDetails = req.body as UserDetails

        return res.status(HttpStatus.OK).json({
            message: await this.recoveryService.sendRecoveryMail(userDetails)
        })
    }

    @ApiBody({ type: ConfirmRecoveryDto })
    @Post('confirmRecovery')
    async confirmRecovery(@Req() req: Request, @Res() res: Response) {
        const confirmRecoveryDto = req.body as ConfirmRecoveryDto

        return res.status(HttpStatus.OK).json({
            message:
                await this.recoveryService.confirmRecoveryCode(
                    confirmRecoveryDto
                )
        })
    }
}
