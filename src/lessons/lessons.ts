import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { CourseDetails } from 'src/utils/types'
import { AddLessonDto } from './dto/AddLesson.dto'

export interface ILessonsService {
    getLessonsByCourse(courseDetails: CourseDetails): Promise<Lesson[]>
    addLesson(addLessonDto: AddLessonDto): Promise<Lesson>
}
