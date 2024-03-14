import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { User } from 'src/database/typeorm/entities/User'
import { Services } from 'src/utils/constants'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'

@Module({
    imports: [TypeOrmModule.forFeature([Course, Lesson, User])],
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
