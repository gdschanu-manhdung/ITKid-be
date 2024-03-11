import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Services } from 'src/utils/constants'
import { KnowledgesController } from './knowledges.controller'
import { KnowledgesService } from './knowledges.service'

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Knowledge])],
    controllers: [KnowledgesController],
    providers: [
        {
            provide: Services.KNOWLEDGES,
            useClass: KnowledgesService
        }
    ],
    exports: [
        {
            provide: Services.KNOWLEDGES,
            useClass: KnowledgesService
        }
    ]
})
export class KnowledgesModule {}
