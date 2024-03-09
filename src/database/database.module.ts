import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './typeorm/entities/Category'
import { Course } from './typeorm/entities/Course'
import { Knowledge } from './typeorm/entities/Knowledge'
import { Lesson } from './typeorm/entities/Lesson'
import { Quizfour } from './typeorm/entities/Quizfour'
import { Quiztwo } from './typeorm/entities/Quiztwo'
import { Test } from './typeorm/entities/Test'
import { User } from './typeorm/entities/User'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [
                    Category,
                    Course,
                    Knowledge,
                    Lesson,
                    Quiztwo,
                    Quizfour,
                    Test,
                    User
                ],
                autoLoadEntities: true,
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
