import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Test } from 'src/database/typeorm/entities/Test'
import { Services } from 'src/utils/constants'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'

@Module({
    imports: [TypeOrmModule.forFeature([Course, Test])],
    controllers: [TestsController],
    providers: [
        {
            provide: Services.TESTS,
            useClass: TestsService
        }
    ],
    exports: [
        {
            provide: Services.TESTS,
            useClass: TestsService
        }
    ]
})
export class TestsModule {}
