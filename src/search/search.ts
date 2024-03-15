import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { SearchQuery } from './dto/SearchQuery.dto'

export interface ISearchService {
    searchCategory(searchQuery: SearchQuery): Promise<Category[]>
    searchCourse(searchQuery: SearchQuery): Promise<Course[]>
}
