import { Quizlesson } from 'src/database/typeorm/entities/Quizlesson'
import { LessonDetails, QuizlessonDetails } from 'src/utils/types'
import { AddQuizlessonDto } from './dto/AddQuizlesson.dto'

export interface IQuizlessonsService {
    addQuiz(addQuizlessonDto: AddQuizlessonDto): Promise<Quizlesson>
    editQuiz(quizlessonDetails: QuizlessonDetails): Promise<Quizlesson>
    getQuiz(lessonDetails: LessonDetails): Promise<Quizlesson>
}
