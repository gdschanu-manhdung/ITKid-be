import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    Put,
    Delete
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { QuiztwoDetails } from 'src/utils/types'
import { QuiztwosService } from './quiztwos.service'

@Controller(Routes.QUIZTWOS)
export class QuiztwosController {
    constructor(
        @Inject(Services.QUIZTWOS) private quiztwosService: QuiztwosService
    ) {}

    @Post('addQuiz')
    async addQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztwoDetails = req.body as QuiztwoDetails

        return res.status(HttpStatus.OK).json({
            quiztwo: await this.quiztwosService.addQuiz(quiztwoDetails)
        })
    }

    @Get('randomQuizzes')
    async getRandomQuizzes(@Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            quizzes: await this.quiztwosService.getRandomQuizzes()
        })
    }

    @Put('editQuiz')
    async editQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztwoDetails = req.body as QuiztwoDetails

        return res.status(HttpStatus.OK).json({
            quiztwo: await this.quiztwosService.editQuiz(quiztwoDetails)
        })
    }

    @Delete('deleteQuiz')
    async deleteQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztwoDetails = req.body as QuiztwoDetails

        return res.status(HttpStatus.OK).json({
            message: await this.quiztwosService.deleteQuiz(quiztwoDetails)
        })
    }
}
