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
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { QuizlessonDetailsDto } from 'src/quizlessons/dto/QuizlessonDetails.dto'
import { Routes, Services } from 'src/utils/constants'
import { QuiztwoDetails } from 'src/utils/types'
import { AddQuiztwoDto } from './dto/AddQuiztwo.dto'
import { QuiztwosService } from './quiztwos.service'

@Controller(Routes.QUIZTWOS)
export class QuiztwosController {
    constructor(
        @Inject(Services.QUIZTWOS) private quiztwosService: QuiztwosService
    ) {}

    @ApiBody({ type: AddQuiztwoDto })
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

    @ApiBody({ type: QuizlessonDetailsDto })
    @Put('editQuiz')
    async editQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztwoDetails = req.body as QuiztwoDetails

        return res.status(HttpStatus.OK).json({
            quiztwo: await this.quiztwosService.editQuiz(quiztwoDetails)
        })
    }

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Delete('deleteQuiz')
    async deleteQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztwoDetails = req.body as QuiztwoDetails

        return res.status(HttpStatus.OK).json({
            message: await this.quiztwosService.deleteQuiz(quiztwoDetails)
        })
    }
}
