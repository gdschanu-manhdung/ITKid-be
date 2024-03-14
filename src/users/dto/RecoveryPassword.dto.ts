import { ApiProperty } from '@nestjs/swagger'

export class RecoveryPasswordDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}
