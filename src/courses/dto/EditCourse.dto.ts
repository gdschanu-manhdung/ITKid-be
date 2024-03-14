import { ApiProperty } from '@nestjs/swagger'

export class EditCourseDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    fee: number

    @ApiProperty()
    image: string
}
