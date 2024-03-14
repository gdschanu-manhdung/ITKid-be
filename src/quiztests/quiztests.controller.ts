import { Routes, Services } from 'src/utils/constants'
import { QuiztestsService } from './quiztests.service'
import {
    Inject,
    Controller,
    Post,
    Put,
    Get,
    Delete,
    Req,
    Res,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'
import { QuiztestDetails, TestDetails } from 'src/utils/types'
import { AddQuiztestDto } from './dto/AddQuiztest.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { QuiztestDetailsDto } from './dto/QuiztestDetails.dto'

@Controller(Routes.QUIZTESTS)
export class QuiztestsController {
    constructor(
        @Inject(Services.QUIZTESTS) private quiztestsService: QuiztestsService
    ) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('getQuizzes')
    async getQuizzes(@Req() req: Request, @Res() res: Response) {
        const testDetails = req.query as TestDetails

        console.log(testDetails)

        return res.status(HttpStatus.OK).json({
            quizzes: await this.quiztestsService.getQuizzesByTest(testDetails)
        })
    }

    @ApiBody({ type: AddQuiztestDto })
    @Post('addQuiz')
    async addQuiz(@Req() req: Request, @Res() res: Response) {
        const addQuiztestDto = req.body as AddQuiztestDto

        return res.status(HttpStatus.OK).json({
            quizzes: await this.quiztestsService.addQuiz(addQuiztestDto)
        })
    }

    @ApiBody({ type: QuiztestDetailsDto })
    @Put('editQuiz')
    async editQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztestDetails = req.body as QuiztestDetails

        return res.status(HttpStatus.OK).json({
            quizzes: await this.quiztestsService.editQuiz(quiztestDetails)
        })
    }

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Delete('deleteQuiz')
    async deleteQuiz(@Req() req: Request, @Res() res: Response) {
        const quiztestDetails = req.body as QuiztestDetails

        return res.status(HttpStatus.OK).json({
            message: await this.quiztestsService.deleteQuiz(quiztestDetails)
        })
    }
}
