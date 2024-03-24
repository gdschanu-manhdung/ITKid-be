import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
    @ApiProperty()
    id: number

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
