import {
    Controller,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    Get
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Routes, Services } from 'src/utils/constants'
import { CourseDetails } from 'src/utils/types'
import { TestsService } from './tests.service'

@Controller(Routes.TESTS)
export class TestsController {
    constructor(@Inject(Services.TESTS) private testsService: TestsService) {}

    @Post('createTest')
    async createTest(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.body as CourseDetails

        return res.status(HttpStatus.OK).json({
            test: await this.testsService.createTest(courseDetails)
        })
    }

    @Get('getTestByCourse')
    async getTestByCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            test: await this.testsService.getTestByCourse(courseDetails)
        })
    }
}
