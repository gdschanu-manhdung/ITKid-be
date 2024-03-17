import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Req,
    Res,
    Post,
    Put,
    Delete
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { Request, Response } from 'express'
import { CoursesService } from './courses.service'
import { CourseDetails, UserDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { PayCourseDto } from './dto/PayCourse.dto'
import { EditCourseDto } from './dto/EditCourse.dto'

@Controller(Routes.COURSES)
export class CoursesController {
    constructor(
        @Inject(Services.COURSES) private coursesService: CoursesService
    ) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('coursesByCategory')
    async getCoursesByCategory(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.query as CourseDetails

        return res.status(HttpStatus.OK).json({
            courses:
                await this.coursesService.getCoursesByCategory(courseDetails)
        })
    }

    @ApiBody({ type: AddCourseDto })
    @Post('addCourse')
    async addCourse(@Req() req: Request, @Res() res: Response) {
        const addCourseDto = req.body as AddCourseDto

        return res.status(HttpStatus.OK).json({
            course: await this.coursesService.addCourse(addCourseDto)
        })
    }

    @ApiBody({ type: PayCourseDto })
    @Post('payCourse')
    async payCourse(@Req() req: Request, @Res() res: Response) {
        const paycourseDto = req.body as PayCourseDto

        return res.status(HttpStatus.OK).json({
            message: await this.coursesService.payCourse(paycourseDto)
        })
    }

    @ApiBody({ type: PayCourseDto })
    @Post('doneCourse')
    async doneCourse(@Req() req: Request, @Res() res: Response) {
        const paycourseDto = req.body as PayCourseDto

        return res.status(HttpStatus.OK).json({
            message: await this.coursesService.doneCourse(paycourseDto)
        })
    }

    @ApiBody({ type: EditCourseDto })
    @Put('editCourse')
    async editCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.body as CourseDetails

        return res.status(HttpStatus.OK).json({
            course: await this.coursesService.editCourse(courseDetails)
        })
    }

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Delete('deleteCourse')
    async deleteCourse(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.body as CourseDetails

        return res.status(HttpStatus.OK).json({
            message: await this.coursesService.deleteCourse(courseDetails)
        })
    }

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Delete('updateAccess')
    async updateAccess(@Req() req: Request, @Res() res: Response) {
        const courseDetails = req.body as CourseDetails

        return res.status(HttpStatus.OK).json({
            message: await this.coursesService.updateAccess(courseDetails)
        })
    }
}
