import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Req,
    Res,
    Post
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { Request, Response } from 'express'
import { CoursesService } from './courses.service'
import { CourseDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'

@Controller(Routes.COURSES)
export class CoursesController {
    constructor(
        @Inject(Services.COURSES) private coursesService: CoursesService
    ) {}

    @Get('coursesByCategory')
    async getCoursesByCategory(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            courses:
                await this.coursesService.getCoursesByCategory(courseDetails)
        })
    }

    @Post('addCourse')
    async addCourse(@Req() req: Request, @Res() res: Response) {
        const addCourseDto = req.body as AddCourseDto

        return res.status(HttpStatus.OK).json({
            course: await this.coursesService.addCourse(addCourseDto)
        })
    }
}
