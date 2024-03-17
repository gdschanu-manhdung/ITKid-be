import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Req,
    Res,
    Post,
    Delete
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { Request, Response } from 'express'
import { KnowledgesService } from './knowledges.service'
import { KnowledgeDetails, LessonDetails } from 'src/utils/types'
import { AddKnowledgeDto } from './dto/AddKnowledge.dto'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { EditKnowledgeDto } from './dto/EditKnowledge.dto'

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

    @ApiBody({ type: EditKnowledgeDto })
    @Post('editKnowledge')
    async editKnowledge(@Req() req: Request, @Res() res: Response) {
        const addKnowledgeDto = req.body as AddKnowledgeDto

        return res.status(HttpStatus.OK).json({
            course: await this.knowledgesService.addKnowledge(addKnowledgeDto)
        })
    }

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Delete('deleteKnowledge')
    async deleteKnowledge(@Req() req: Request, @Res() res: Response) {
        const knowledgeDetails = req.body as KnowledgeDetails

        return res.status(HttpStatus.OK).json({
            message:
                await this.knowledgesService.deleteKnowledge(knowledgeDetails)
        })
    }
}
