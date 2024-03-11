import { Category } from 'src/database/typeorm/entities/Category'

export interface ICategoriesService {
    getAllCategories(): Promise<Category[]>
}
