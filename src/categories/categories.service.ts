import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Repository } from 'typeorm'
import { ICategoriesService } from './categories'

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

            console.log(allCategories)
            return allCategories
        } catch (error) {
            console.error(error)
        }
    }
}
