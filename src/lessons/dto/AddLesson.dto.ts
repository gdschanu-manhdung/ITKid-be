import { ApiProperty } from '@nestjs/swagger'

export class AddLessonDto {
    @ApiProperty()
    courseId: number

    @ApiProperty()
    name: string
}
