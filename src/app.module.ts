import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { RecoveryModule } from './recovery/recovery.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        DatabaseModule,
        AuthModule,
        UsersModule,
        RecoveryModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            entities: ['dist/database/typeorm/entities/*.js'],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false
            }
        }),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: `smtps://gunnyrealer12@gmail.com:${process.env.NODEMAILER_PASSWORD}@smtp.gmail.com`,
                defaults: {
                    from: '"no-reply" <noreply@itkid.com>'
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            })
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
