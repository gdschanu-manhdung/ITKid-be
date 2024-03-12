import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Quizlesson } from 'src/database/typeorm/entities/Quizlesson'
import { Services } from 'src/utils/constants'
import { LessonDetails, QuizlessonDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { AddQuizlessonDto } from './dto/AddQuizlesson.dto'
import { IQuizlessonsService } from './quizlessons'

export class QuizlessonsService implements IQuizlessonsService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Quizlesson)
        private readonly quizlessonRepository: Repository<Quizlesson>
    ) {}

    async addQuiz(addQuizlessonDto: AddQuizlessonDto) {
        try {
            const lesson = await this.lessonRepository.findOne({
                where: { id: addQuizlessonDto.lessonId }
            })

            if (!lesson) {
                throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
            }

            // if (lesson.quizlesson) {
            //     throw new HttpException('Existing quiz', HttpStatus.FORBIDDEN)
            // }

            const {
                question,
                answer_1,
                answer_2,
                answer_3,
                answer_4,
                true_answer
            } = addQuizlessonDto

            const quizlessonDetails = {
                lesson,
                question,
                answer_1,
                answer_2,
                answer_3,
                answer_4,
                true_answer
            }

            const quizlesson =
                this.quizlessonRepository.create(quizlessonDetails)

            console.log(quizlesson)
            return await this.quizlessonRepository.save(quizlesson)
        } catch (error) {
            console.error(error)
        }
    }

    async getQuiz(lessonDetails: LessonDetails) {
        try {
            const lesson = await this.lessonRepository.findOne({
                where: { id: Number(lessonDetails.id) }
            })

            if (!lesson) {
                throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
            }

            console.log(2)

            const quizlesson = await this.quizlessonRepository.findOne({
                where: { lesson }
            })

            console.log(1)

            return quizlesson
        } catch (error) {
            console.error(error)
        }
    }

    async editQuiz(quizlessonDetails: QuizlessonDetails) {
        try {
            const quizlesson = await this.quizlessonRepository.findOne({
                where: { id: quizlessonDetails.id }
            })

            if (!quizlesson) {
                throw new HttpException('Wrong quiz', HttpStatus.NOT_FOUND)
            }

            const editedQuizlesson = {
                ...quizlesson,
                question: quizlessonDetails.question,
                answer_1: quizlessonDetails.answer_1,
                answer_2: quizlessonDetails.answer_2,
                answer_3: quizlessonDetails.answer_3,
                answer_4: quizlessonDetails.answer_4,
                true_answer: quizlessonDetails.true_answer
            }

            return await this.quizlessonRepository.save(editedQuizlesson)
        } catch (error) {
            console.error(error)
        }
    }
}
