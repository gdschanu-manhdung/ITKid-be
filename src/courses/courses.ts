import { Course } from 'src/database/typeorm/entities/Course'
import { CategoryDetails, CourseDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'

export interface ICoursesService {
    getCoursesByCategory(categoryDetails: CategoryDetails): Promise<Course[]>
    addCourse(addCourseDto: AddCourseDto): Promise<Course>
}
