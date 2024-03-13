import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Quiztest } from 'src/database/typeorm/entities/Quiztest'
import { Test } from 'src/database/typeorm/entities/Test'
import { QuiztestDetails, TestDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { AddQuiztestDto } from './dto/AddQuiztest.dto'
import { IQuiztestsService } from './quiztests'

export class QuiztestsService implements IQuiztestsService {
    constructor(
        @InjectRepository(Test)
        private readonly testRepository: Repository<Test>,
        @InjectRepository(Quiztest)
        private readonly quiztestRepository: Repository<Quiztest>
    ) {}

    async getQuizzesByTest(testDetails: TestDetails) {
        try {
            console.log(testDetails)

            const test = await this.testRepository.findOne({
                where: { id: Number(testDetails.id) }
            })

            if (!test) {
                throw new HttpException('Wrong test', HttpStatus.NOT_FOUND)
            }

            console.log(test)

            const quiztests = await this.quiztestRepository.find({
                where: { test }
            })

            return quiztests
        } catch (error) {
            console.error(error)
        }
    }

    async addQuiz(addQuiztestDto: AddQuiztestDto) {
        try {
            const test = await this.testRepository.findOne({
                where: { id: addQuiztestDto.testId }
            })

            if (!test) {
                throw new HttpException('Wrong test', HttpStatus.NOT_FOUND)
            }

            const {
                question,
                answer_1,
                answer_2,
                answer_3,
                answer_4,
                true_answer
            } = addQuiztestDto

            const quiztestDetails = {
                test,
                question,
                answer_1,
                answer_2,
                answer_3,
                answer_4,
                true_answer
            }

            const quiztest = this.quiztestRepository.create(quiztestDetails)
            return await this.quiztestRepository.save(quiztest)
        } catch (error) {
            console.error(error)
        }
    }

    async editQuiz(quiztestDetails: QuiztestDetails) {
        try {
            const quiztest = await this.quiztestRepository.findOne({
                where: { id: quiztestDetails.id }
            })

            if (!quiztest) {
                throw new HttpException('Wrong quiz', HttpStatus.NOT_FOUND)
            }

            const editedQuizlesson = {
                ...quiztest,
                question: quiztestDetails.question,
                answer_1: quiztestDetails.answer_1,
                answer_2: quiztestDetails.answer_2,
                answer_3: quiztestDetails.answer_3,
                answer_4: quiztestDetails.answer_4,
                true_answer: quiztestDetails.true_answer
            }

            return await this.quiztestRepository.save(editedQuizlesson)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteQuiz(quiztestDetails: QuiztestDetails) {
        try {
            const quiztest = await this.quiztestRepository.findOne({
                where: { id: quiztestDetails.id }
            })

            if (!quiztest) {
                throw new HttpException('Wrong quiz', HttpStatus.NOT_FOUND)
            }

            await this.quiztestRepository.delete(quiztest)

            return 'Delete successfully'
        } catch (error) {
            console.error(error)
        }
    }
}
