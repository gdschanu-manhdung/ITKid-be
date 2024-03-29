import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { Services } from 'src/utils/constants'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
    imports: [TypeOrmModule.forFeature([Category, Course])],
    controllers: [CategoriesController],
    providers: [
        {
            provide: Services.CATEGORIES,
            useClass: CategoriesService
        }
    ],
    exports: [
        {
            provide: Services.CATEGORIES,
            useClass: CategoriesService
        }
    ]
})
export class CategoriesModule {}
