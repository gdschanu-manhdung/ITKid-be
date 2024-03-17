import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { Like, Repository } from 'typeorm'
import { SearchQuery } from './dto/SearchQuery.dto'
import { ISearchService } from './search'

export class SearchService implements ISearchService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    async searchCategory(searchQuery: SearchQuery) {
        try {
            const categories = await this.categoryRepository.find({
                where: { name: Like(`${searchQuery.query}`) }
            })

            return categories
        } catch (error) {
            console.error(error)
        }
    }

    async searchCourse(searchQuery: SearchQuery) {
        try {
            const courses = await this.courseRepository.find({
                where: { name: Like(`${searchQuery.query}`) }
            })

            return courses
        } catch (error) {
            console.error(error)
        }
    }
}
