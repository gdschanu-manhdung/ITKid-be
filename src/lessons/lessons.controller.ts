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

@Controller(Routes.LESSONS)
export class LessonsController {
    constructor(
        @Inject(Services.LESSONS) private lessonsService: LessonsService
    ) {}

    @Get('lessonsByCourse')
    async getLessonsByCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            lessons: await this.lessonsService.getLessonsByCourse(courseDetails)
        })
    }

    @Post('addLesson')
    async addLesson(@Req() req: Request, @Res() res: Response) {
        const addLessonDto = req.body as AddLessonDto

        return res.status(HttpStatus.OK).json({
            lesson: await this.lessonsService.addLesson(addLessonDto)
        })
    }
}
