import { Category } from 'src/database/typeorm/entities/Category'
import { AddCategoryDto } from './dto/AddCategory.dto'

export interface ICategoriesService {
    getAllCategories(): Promise<Category[]>
    addCategory(addCategoryDto: AddCategoryDto): Promise<Category>
}
