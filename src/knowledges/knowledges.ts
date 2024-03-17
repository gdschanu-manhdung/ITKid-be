import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { KnowledgeDetails, LessonDetails } from 'src/utils/types'
import { AddKnowledgeDto } from './dto/AddKnowledge.dto'
import { EditKnowledgeDto } from './dto/EditKnowledge.dto'

export interface IKnowledgesService {
    getKnowledgesByLesson(lessonDetails: LessonDetails): Promise<Knowledge[]>
    addKnowledge(addKnowledgeDto: AddKnowledgeDto): Promise<Knowledge>
    editKnowledge(editKnowledgeDto: EditKnowledgeDto): Promise<Knowledge>
    deleteKnowledge(knowledgeDetails: KnowledgeDetails): Promise<string>
}
