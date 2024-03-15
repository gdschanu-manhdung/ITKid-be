import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Repository } from 'typeorm'
import { ICategoriesService } from './categories'
import { AddCategoryDto } from './dto/AddCategory.dto'

export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async getAllCategories() {
        try {
            const allCategories = await this.categoryRepository.find()

            if (!allCategories) {
                throw new HttpException(
                    'Error with categories',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }

            return allCategories
        } catch (error) {
            console.error(error)
        }
    }

    async addCategory(addCategoryDto: AddCategoryDto) {
        try {
            const category = this.categoryRepository.create(addCategoryDto)

            return await this.categoryRepository.save(category)
        } catch (error) {
            console.error(error)
        }
    }
}
