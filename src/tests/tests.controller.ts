import {
    Controller,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    Get
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { CourseDetails } from 'src/utils/types'
import { TestsService } from './tests.service'

@Controller(Routes.TESTS)
export class TestsController {
    constructor(@Inject(Services.TESTS) private testsService: TestsService) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Post('createTest')
    async createTest(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.body as CourseDetails

        return res.status(HttpStatus.OK).json({
            test: await this.testsService.createTest(courseDetails)
        })
    }

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('getTestByCourse')
    async getTestByCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            test: await this.testsService.getTestByCourse(courseDetails)
        })
    }
}
