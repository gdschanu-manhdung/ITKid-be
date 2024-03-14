import { ApiProperty } from '@nestjs/swagger'

export class AddCourseDto {
    @ApiProperty()
    categoryId: number

    @ApiProperty()
    name: string

    @ApiProperty()
    fee: number

    @ApiProperty()
    image: string
}
