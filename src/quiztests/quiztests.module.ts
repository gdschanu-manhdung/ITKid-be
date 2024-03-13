import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiztest } from 'src/database/typeorm/entities/Quiztest'
import { Test } from 'src/database/typeorm/entities/Test'
import { TestsController } from 'src/tests/tests.controller'
import { Services } from 'src/utils/constants'
import { QuiztestsController } from './quiztests.controller'
import { QuiztestsService } from './quiztests.service'

@Module({
    imports: [TypeOrmModule.forFeature([Test, Quiztest])],
    controllers: [QuiztestsController],
    providers: [
        {
            provide: Services.QUIZTESTS,
            useClass: QuiztestsService
        }
    ],
    exports: [
        {
            provide: Services.QUIZTESTS,
            useClass: QuiztestsService
        }
    ]
})
export class QuiztestsModule {}
