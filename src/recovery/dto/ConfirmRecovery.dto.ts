import { IsEmail, IsNotEmpty } from 'class-validator'

export class ConfirmRecoveryDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    recoveryCode: string
}
