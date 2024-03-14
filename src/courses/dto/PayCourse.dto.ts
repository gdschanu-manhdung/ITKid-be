import { ApiProperty } from '@nestjs/swagger'

export class PayCourseDto {
    @ApiProperty()
    userId: number

    @ApiProperty()
    courseId: number
}
