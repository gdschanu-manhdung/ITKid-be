import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Test } from 'src/database/typeorm/entities/Test'
import { User } from 'src/database/typeorm/entities/User'
import { Services } from 'src/utils/constants'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'

@Module({
    imports: [TypeOrmModule.forFeature([Course, Category, User, Test, Lesson])],
    controllers: [CoursesController],
    providers: [
        {
            provide: Services.COURSES,
            useClass: CoursesService
        }
    ],
    exports: [
        {
            provide: Services.COURSES,
            useClass: CoursesService
        }
    ]
})
export class CoursesModule {}
