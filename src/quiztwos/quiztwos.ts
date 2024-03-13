import { Quiztwo } from 'src/database/typeorm/entities/Quiztwo'
import { QuiztwoDetails } from 'src/utils/types'

export interface IQuiztwosService {
    addQuiz(quiztwoDetails: QuiztwoDetails): Promise<Quiztwo>
    getRandomQuizzes(): Promise<Quiztwo[]>
    editQuiz(quiztwoDetails: QuiztwoDetails): Promise<Quiztwo>
    deleteQuiz(quiztwoDetails: QuiztwoDetails): Promise<string>
}
