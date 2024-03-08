import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [],
                autoLoadEntities: true,
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
