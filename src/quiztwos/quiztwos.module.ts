import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiztwo } from 'src/database/typeorm/entities/Quiztwo'
import { Services } from 'src/utils/constants'
import { QuiztwosController } from './quiztwos.controller'
import { QuiztwosService } from './quiztwos.service'

@Module({
    imports: [TypeOrmModule.forFeature([Quiztwo])],
    controllers: [QuiztwosController],
    providers: [
        {
            provide: Services.QUIZTWOS,
            useClass: QuiztwosService
        }
    ],
    exports: [
        {
            provide: Services.QUIZTWOS,
            useClass: QuiztwosService
        }
    ]
})
export class QuiztwosModule {}
