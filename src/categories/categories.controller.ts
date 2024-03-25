import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    Delete,
    Put
} from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import { CategoriesService } from './categories.service'
import { Response, Request } from 'express'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { AddCategoryDto } from './dto/AddCategory.dto'
import { CategoryDetails } from 'src/utils/types'
import { SearchCategoryDto } from './dto/SearchCategory.dto'
import { EditCategoryDto } from './dto/EditCategory.dto'

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
    @Delete('deleteCategory')
    async deleteCategory(@Req() req: Request, @Res() res: Response) {
        const categoryDetails = req.body as CategoryDetails

        return res.status(HttpStatus.OK).json({
            category:
                await this.categoriesService.deleteCategory(categoryDetails)
        })
    }

    @ApiQuery({ name: 'searchQuery', required: true, type: String })
    @Get('getCategoriesByString')
    async getCategoriesByString(@Req() req: Request, @Res() res: Response) {
        const searchCategoryDto = req.query as SearchCategoryDto

        return res.status(HttpStatus.OK).json({
            categories:
                await this.categoriesService.getCategoriesByString(
                    searchCategoryDto
                )
        })
    }

    @ApiQuery({ name: 'id', required: true, type: Number })
    @Get('getCategoryById')
    async getCategoryById(@Req() req: Request, @Res() res: Response) {
        const categoryDetails = req.query as CategoryDetails

        return res.status(HttpStatus.OK).json({
            category:
                await this.categoriesService.getCategoryById(categoryDetails)
        })
    }

    @ApiBody({ type: EditCategoryDto })
    @Put('updateCategory')
    async updateCategory(@Req() req: Request, @Res() res: Response) {
        const editCategoryDto = req.body as EditCategoryDto

        return res.status(HttpStatus.OK).json({
            category: await this.categoriesService.editCategory(editCategoryDto)
        })
    }
}
