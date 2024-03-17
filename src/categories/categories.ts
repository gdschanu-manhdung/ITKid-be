import { Category } from 'src/database/typeorm/entities/Category'
import { CategoryDetails } from 'src/utils/types'
import { AddCategoryDto } from './dto/AddCategory.dto'
import { EditCategoryDto } from './dto/EditCategory.dto'

export interface ICategoriesService {
    getAllCategories(): Promise<Category[]>
    addCategory(addCategoryDto: AddCategoryDto): Promise<Category>
    updateAccess(categoryDetails: CategoryDetails): Promise<Category>
    editCategory(editCategoryDto: EditCategoryDto): Promise<Category>
    deleteCategory(categoryDetails: CategoryDetails): Promise<string>
}
