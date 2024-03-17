import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { Services } from 'src/utils/constants'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
    imports: [TypeOrmModule.forFeature([Category, Course])],
    controllers: [SearchController],
    providers: [
        {
            provide: Services.SEARCH,
            useClass: SearchService
        }
    ],
    exports: [
        {
            provide: Services.SEARCH,
            useClass: SearchService
        }
    ]
})
export class SearchModule {}
