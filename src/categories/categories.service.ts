import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { CategoryDetails } from 'src/utils/types'
import { Like, Repository } from 'typeorm'
import { ICategoriesService } from './categories'
import { AddCategoryDto } from './dto/AddCategory.dto'
import { EditCategoryDto } from './dto/EditCategory.dto'
import { SearchCategoryDto } from './dto/SearchCategory.dto'

export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    async getAllCategories() {
        try {
            const allCategories = await this.categoryRepository.find({
                order: { access: 'DESC' }
            })

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
            const category = this.categoryRepository.create({
                ...addCategoryDto,
                access: 0
            })

            return await this.categoryRepository.save(category)
        } catch (error) {
            console.error(error)
        }
    }

    async updateAccess(categoryDetails: CategoryDetails) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryDetails.id }
            })

            if (!category) {
                throw new HttpException('Wrong category', HttpStatus.NOT_FOUND)
            }

            const updatedCategory = {
                ...category,
                access: category.access + 1
            }

            return await this.categoryRepository.save(updatedCategory)
        } catch (error) {
            console.error(error)
        }
    }

    async editCategory(editCategoryDto: EditCategoryDto) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: editCategoryDto.id }
            })

            if (!category) {
                throw new HttpException('Wrong category', HttpStatus.NOT_FOUND)
            }

            const updatedCategory = {
                ...category,
                name: editCategoryDto.name
            }

            return await this.categoryRepository.save(updatedCategory)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteCategory(categoryDetails: CategoryDetails) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryDetails.id }
            })

            if (!category) {
                throw new HttpException('Wrong category', HttpStatus.NOT_FOUND)
            }

            // await this.courseRepository.remove(category.courses)

            await this.categoryRepository.remove(category)

            return 'Delete successfully!'
        } catch (error) {
            console.error(error)
        }
    }

    async getCategoriesByString(searchCategoryDto: SearchCategoryDto) {
        try {
            const categories = await this.categoryRepository.find({
                where: { name: Like(`%${searchCategoryDto.searchQuery}%`) }
            })

            return categories
        } catch (error) {
            console.error(error)
        }
    }
}
