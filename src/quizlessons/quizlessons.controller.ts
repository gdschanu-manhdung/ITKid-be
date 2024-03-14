import {
    Get,
    Req,
    Res,
    Controller,
    HttpStatus,
    Inject,
    Post,
    Put
} from '@nestjs/common'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { QuizlessonDetails } from 'src/utils/types'
import { AddQuizlessonDto } from './dto/AddQuizlesson.dto'
import { QuizlessonDetailsDto } from './dto/QuizlessonDetails.dto'
import { QuizlessonsService } from './quizlessons.service'

@Controller(Routes.QUIZLESSONS)
export class QuizlessonsController {
    constructor(
        @Inject(Services.QUIZLESSONS)
        private quizlessonsService: QuizlessonsService
    ) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('getQuiz')
    async getQuiz(@Req() req: Request, @Res() res: Response) {
        const quizlessonDetails = req.query as QuizlessonDetails

        return res.status(HttpStatus.OK).json({
            quizlesson: await this.quizlessonsService.getQuiz(quizlessonDetails)
        })
    }

    @ApiBody({ type: AddQuizlessonDto })
    @Post('addQuiz')
    async addQuiz(@Req() req: Request, @Res() res: Response) {
        const addQuizlessonDto = req.body as AddQuizlessonDto

        return res.status(HttpStatus.OK).json({
            quizlesson: await this.quizlessonsService.addQuiz(addQuizlessonDto)
        })
    }

    @ApiBody({ type: QuizlessonDetailsDto })
    @Put('editQuiz')
    async editQuiz(@Req() req: Request, @Res() res: Response) {
        const quizlessonDetails = req.body as QuizlessonDetails

        return res.status(HttpStatus.OK).json({
            quizlesson:
                await this.quizlessonsService.editQuiz(quizlessonDetails)
        })
    }
}
