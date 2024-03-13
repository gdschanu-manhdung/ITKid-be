import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Quiztwo } from 'src/database/typeorm/entities/Quiztwo'
import { getRandomElements } from 'src/utils/helper'
import { QuiztwoDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { IQuiztwosService } from './quiztwos'

export class QuiztwosService implements IQuiztwosService {
    constructor(
        @InjectRepository(Quiztwo)
        private readonly quiztwoRepository: Repository<Quiztwo>
    ) {}

    async addQuiz(quiztwoDetails: QuiztwoDetails) {
        try {
            const quiztwo = this.quiztwoRepository.create(quiztwoDetails)

            return await this.quiztwoRepository.save(quiztwo)
        } catch (error) {
            console.error(error)
        }
    }

    async getRandomQuizzes() {
        try {
            const quiztwos = await this.quiztwoRepository.find()

            return getRandomElements(quiztwos, 10)
        } catch (error) {
            console.error(error)
        }
    }

    async editQuiz(quiztwoDetails: QuiztwoDetails) {
        try {
            const quiztwo = await this.quiztwoRepository.findOne({
                where: { id: quiztwoDetails.id }
            })

            if (!quiztwo) {
                throw new HttpException('Wrong quiz', HttpStatus.NOT_FOUND)
            }

            const { question, answer_1, answer_2, true_answer } = quiztwoDetails

            const editedQuiztwo = {
                ...quiztwo,
                question,
                answer_1,
                answer_2,
                true_answer
            }

            return await this.quiztwoRepository.save(editedQuiztwo)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteQuiz(quiztwoDetails: QuiztwoDetails) {
        try {
            const quiztwo = await this.quiztwoRepository.findOne({
                where: { id: quiztwoDetails.id }
            })

            if (!quiztwo) {
                throw new HttpException('Wrong quiz', HttpStatus.NOT_FOUND)
            }

            await this.quiztwoRepository.delete(quiztwo)

            return 'Delete successfully!'
        } catch (error) {
            console.error(error)
        }
    }
}
