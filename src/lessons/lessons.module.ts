import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Quizlesson } from 'src/database/typeorm/entities/Quizlesson'
import { User } from 'src/database/typeorm/entities/User'
import { Services } from 'src/utils/constants'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Course, Lesson, User, Knowledge, Quizlesson])
    ],
    controllers: [LessonsController],
    providers: [
        {
            provide: Services.LESSONS,
            useClass: LessonsService
        }
    ],
    exports: [
        {
            provide: Services.LESSONS,
            useClass: LessonsService
        }
    ]
})
export class LessonsModule {}
