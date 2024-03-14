import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    name: string

    @ApiProperty()
    dob: string

    @ApiProperty()
    phone: string
}
