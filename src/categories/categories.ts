import { Category } from 'src/database/typeorm/entities/Category'
import { CategoryDetails } from 'src/utils/types'
import { AddCategoryDto } from './dto/AddCategory.dto'
import { EditCategoryDto } from './dto/EditCategory.dto'
import { SearchCategoryDto } from './dto/SearchCategory.dto'

export interface ICategoriesService {
    getAllCategories(): Promise<Category[]>
    addCategory(addCategoryDto: AddCategoryDto): Promise<Category>
    updateAccess(categoryDetails: CategoryDetails): Promise<Category>
    editCategory(editCategoryDto: EditCategoryDto): Promise<Category>
    deleteCategory(categoryDetails: CategoryDetails): Promise<string>
    getCategoriesByString(
        searchCategoryDto: SearchCategoryDto
    ): Promise<Category[]>
}
