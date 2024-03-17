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
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { AddCategoryDto } from './dto/AddCategory.dto'
import { CategoryDetails } from 'src/utils/types'

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

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Post('updateAccess')
    async updateAccess(@Req() req: Request, @Res() res: Response) {
        const categoryDetails = req.body as CategoryDetails

        return res.status(HttpStatus.OK).json({
            category: await this.categoriesService.updateAccess(categoryDetails)
        })
    }

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Post('deleteCategory')
    async deleteCategory(@Req() req: Request, @Res() res: Response) {
        const categoryDetails = req.body as CategoryDetails

        return res.status(HttpStatus.OK).json({
            category: await this.categoriesService.updateAccess(categoryDetails)
        })
    }
}
