import { Quiztest } from 'src/database/typeorm/entities/Quiztest'
import { QuiztestDetails, TestDetails } from 'src/utils/types'
import { AddQuiztestDto } from './dto/AddQuiztest.dto'

export interface IQuiztestsService {
    getQuizzesByTest(testDetails: TestDetails): Promise<Quiztest[]>
    addQuiz(addQuiztestDto: AddQuiztestDto): Promise<Quiztest>
    editQuiz(quiztestDetails: QuiztestDetails): Promise<Quiztest>
    deleteQuiz(quiztestDetails: QuiztestDetails): Promise<string>
}
