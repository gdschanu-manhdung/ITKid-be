import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        DatabaseModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            entities: ['dist/database/typeorm/entities/*.js'],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false
            }
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
