import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Quizlesson } from 'src/database/typeorm/entities/Quizlesson'
import { Services } from 'src/utils/constants'
import { QuizlessonsController } from './quizlessons.controller'
import { QuizlessonsService } from './quizlessons.service'

@Module({
    imports: [TypeOrmModule.forFeature([Quizlesson, Lesson])],
    controllers: [QuizlessonsController],
    providers: [
        {
            provide: Services.QUIZLESSONS,
            useClass: QuizlessonsService
        }
    ],
    exports: [
        {
            provide: Services.QUIZLESSONS,
            useClass: QuizlessonsService
        }
    ]
})
export class QuizlessonsModule {}
