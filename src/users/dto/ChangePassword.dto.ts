import { IsEmail, IsNotEmpty } from 'class-validator'

export class ChangePasswordDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    oldPassword: string

    @IsNotEmpty()
    newPassword: string
}
