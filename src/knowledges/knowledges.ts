import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { LessonDetails } from 'src/utils/types'
import { AddKnowledgeDto } from './dto/AddKnowledge.dto'

export interface IKnowledgesService {
    getKnowledgesByLesson(lessonDetails: LessonDetails): Promise<Knowledge[]>
    addKnowledge(addKnowledgeDto: AddKnowledgeDto): Promise<Knowledge>
}
