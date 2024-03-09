import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/database/typeorm/entities/User'
import { Services } from 'src/utils/constants'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
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
