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
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { QuizlessonDetails } from 'src/utils/types'
import { AddQuizlessonDto } from './dto/AddQuizlesson.dto'
import { QuizlessonsService } from './quizlessons.service'

@Controller(Routes.QUIZLESSONS)
export class QuizlessonsController {
    constructor(
        @Inject(Services.QUIZLESSONS)
        private quizlessonsService: QuizlessonsService
    ) {}

    @Get('getQuiz')
    async getQuiz(@Req() req: Request, @Res() res: Response) {
        const quizlessonDetails = req.query as QuizlessonDetails

        return res.status(HttpStatus.OK).json({
            quizlesson: await this.quizlessonsService.getQuiz(quizlessonDetails)
        })
    }

    @Post('addQuiz')
    async addQuiz(@Req() req: Request, @Res() res: Response) {
        const addQuizlessonDto = req.body as AddQuizlessonDto

        return res.status(HttpStatus.OK).json({
            quizlesson: await this.quizlessonsService.addQuiz(addQuizlessonDto)
        })
    }

    @Put('editQuiz')
    async editQuiz(@Req() req: Request, @Res() res: Response) {
        const quizlessonDetails = req.body as QuizlessonDetails

        return res.status(HttpStatus.OK).json({
            quizlesson:
                await this.quizlessonsService.editQuiz(quizlessonDetails)
        })
    }
}
