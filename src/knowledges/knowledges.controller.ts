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
import { KnowledgesService } from './knowledges.service'
import { LessonDetails } from 'src/utils/types'
import { AddKnowledgeDto } from './dto/AddKnowledge.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'

@Controller(Routes.KNOWLEDGES)
export class KnowledgesController {
    constructor(
        @Inject(Services.KNOWLEDGES)
        private knowledgesService: KnowledgesService
    ) {}

    @ApiQuery({ name: 'id', required: false, type: Number })
    @Get('knowledgesByLesson')
    async getKnowledgesByLesson(@Req() req: Request, @Res() res: Response) {
        const lessonDetails = req.query as LessonDetails

        return res.status(HttpStatus.OK).json({
            courses:
                await this.knowledgesService.getKnowledgesByLesson(
                    lessonDetails
                )
        })
    }

    @ApiBody({ type: AddKnowledgeDto })
    @Post('addKnowledge')
    async addKnowledge(@Req() req: Request, @Res() res: Response) {
        const addKnowledgeDto = req.body as AddKnowledgeDto

        return res.status(HttpStatus.OK).json({
            course: await this.knowledgesService.addKnowledge(addKnowledgeDto)
        })
    }
}
