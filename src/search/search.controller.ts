import { Controller, Inject, Res, Req, Post, HttpStatus } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { Routes, Services } from 'src/utils/constants'
import { Request, Response } from 'express'
import { SearchService } from './search.service'
import { SearchQuery } from './dto/SearchQuery.dto'

@Controller(Routes.SEARCH)
export class SearchController {
    constructor(
        @Inject(Services.SEARCH) private searchService: SearchService
    ) {}

    @ApiBody({ type: SearchQuery })
    @Post('searchCategory')
    async searchCategory(@Req() req: Request, @Res() res: Response) {
        const searchQuery = req.body as SearchQuery

        return res.status(HttpStatus.OK).json({
            categories: await this.searchService.searchCategory(searchQuery)
        })
    }

    @ApiBody({ type: SearchQuery })
    @Post('searchCourse')
    async searchCourse(@Req() req: Request, @Res() res: Response) {
        const searchQuery = req.body as SearchQuery

        return res.status(HttpStatus.OK).json({
            courses: await this.searchService.searchCourse(searchQuery)
        })
    }
}
