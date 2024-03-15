import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { CategoriesService } from './categories.service'
import { Response, Request } from 'express'
import { ApiBody } from '@nestjs/swagger'
import { AddCategoryDto } from './dto/AddCategory.dto'

@Controller(Routes.CATEGORIES)
export class CategoriesController {
    constructor(
        @Inject(Services.CATEGORIES)
        private categoriesService: CategoriesService
    ) {}

    @Get('allCategories')
    async getAllCategories(@Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            categories: await this.categoriesService.getAllCategories()
        })
    }

    @ApiBody({ type: AddCategoryDto })
    @Post('addCategory')
    async addCategory(@Req() req: Request, @Res() res: Response) {
        const addCategoryDto = req.body as AddCategoryDto

        return res.status(HttpStatus.OK).json({
            category: await this.categoriesService.addCategory(addCategoryDto)
        })
    }
}
