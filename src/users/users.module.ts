import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { History } from 'src/database/typeorm/entities/History'
import { User } from 'src/database/typeorm/entities/User'
import { Services } from 'src/utils/constants'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, History])],
    controllers: [UsersController],
    providers: [
        {
            provide: Services.USERS,
            useClass: UsersService
        }
    ],
    exports: [
        {
            provide: Services.USERS,
            useClass: UsersService
        }
    ]
})
export class UsersModule {}
