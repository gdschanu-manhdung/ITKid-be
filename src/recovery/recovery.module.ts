import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recovery } from 'src/database/typeorm/entities/Recovery'
import { UsersModule } from 'src/users/users.module'
import { Services } from 'src/utils/constants'
import { RecoveryController } from './recovery.controller'
import { RecoveryService } from './recovery.service'

@Module({
    imports: [TypeOrmModule.forFeature([Recovery]), UsersModule],
    controllers: [RecoveryController],
    providers: [
        {
            provide: Services.RECOVERY,
            useClass: RecoveryService
        }
    ],
    exports: [
        {
            provide: Services.RECOVERY,
            useClass: RecoveryService
        }
    ]
})
export class RecoveryModule {}
