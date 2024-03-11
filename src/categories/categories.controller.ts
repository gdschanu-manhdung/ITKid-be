import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { CategoriesService } from './categories.service'
import { Response } from 'express'

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
}
