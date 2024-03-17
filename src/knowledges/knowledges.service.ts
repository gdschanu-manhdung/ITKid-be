import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { KnowledgeDetails, LessonDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { AddKnowledgeDto } from './dto/AddKnowledge.dto'
import { EditKnowledgeDto } from './dto/EditKnowledge.dto'
import { IKnowledgesService } from './knowledges'

export class KnowledgesService implements IKnowledgesService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Knowledge)
        private readonly knowledgeRepository: Repository<Knowledge>
    ) {}

    async getKnowledgesByLesson(lessonDetails: LessonDetails) {
        try {
            const lesson = await this.lessonRepository.findOne({
                where: { id: Number(lessonDetails.id) }
            })

            if (!lesson) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const knowledges = await this.knowledgeRepository.find({
                where: { lesson }
            })

            return knowledges
        } catch (error) {
            console.error(error)
        }
    }

    async addKnowledge(addKnowledgeDto: AddKnowledgeDto) {
        try {
            const lesson = await this.lessonRepository.findOne({
                where: { id: addKnowledgeDto.lessonId }
            })

            if (!lesson) {
                throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
            }

            const { name, description } = addKnowledgeDto

            const knowledgeDetails = {
                lesson,
                name,
                description
            }

            const knowledge = this.knowledgeRepository.create(knowledgeDetails)
            return await this.knowledgeRepository.save(knowledge)
        } catch (error) {
            console.error(error)
        }
    }

    async editKnowledge(editKnowledgeDto: EditKnowledgeDto) {
        try {
            const knowledge = await this.knowledgeRepository.findOne({
                where: { id: editKnowledgeDto.id }
            })

            if (!knowledge) {
                throw new HttpException('Wrong knowledge', HttpStatus.NOT_FOUND)
            }

            const { name, description, image } = editKnowledgeDto

            const updatedKnowledge = {
                ...knowledge,
                name,
                description,
                image
            }

            return await this.knowledgeRepository.save(updatedKnowledge)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteKnowledge(knowledgeDetails: KnowledgeDetails) {
        const knowledge = await this.knowledgeRepository.findOne({
            where: { id: knowledgeDetails.id }
        })

        if (!knowledge) {
            throw new HttpException('Wrong knowledge', HttpStatus.NOT_FOUND)
        }

        // Xóa Knowledge
        await this.knowledgeRepository.remove(knowledge)

        return 'Delete successfully'
    }
}
