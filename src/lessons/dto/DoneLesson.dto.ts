import { ApiProperty } from '@nestjs/swagger'

export class DoneLessonDto {
    @ApiProperty()
    userId: number

    @ApiProperty()
    lessonId: number
}
