import {
    Controller,
    HttpStatus,
    Inject,
    Req,
    Res,
    Get,
    Post
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { CourseDetails } from 'src/utils/types'
import { LessonsService } from './lessons.service'
import { Request, Response } from 'express'
import { AddLessonDto } from './dto/AddLesson.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { DoneLessonDto } from './dto/DoneLesson.dto'

@Controller(Routes.LESSONS)
export class LessonsController {
    constructor(
        @Inject(Services.LESSONS) private lessonsService: LessonsService
    ) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('lessonsByCourse')
    async getLessonsByCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            lessons: await this.lessonsService.getLessonsByCourse(courseDetails)
        })
    }

    @ApiBody({ type: AddLessonDto })
    @Post('addLesson')
    async addLesson(@Req() req: Request, @Res() res: Response) {
        const addLessonDto = req.body as AddLessonDto

        return res.status(HttpStatus.OK).json({
            lesson: await this.lessonsService.addLesson(addLessonDto)
        })
    }

    @ApiBody({ type: DoneLessonDto })
    @Post('doneCourse')
    async doneCourse(@Req() req: Request, @Res() res: Response) {
        const doneLessonDto = req.body as DoneLessonDto

        return res.status(HttpStatus.OK).json({
            message: await this.lessonsService.doneLesson(doneLessonDto)
        })
    }
}
