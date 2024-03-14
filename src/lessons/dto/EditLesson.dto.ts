import { ApiProperty } from '@nestjs/swagger'

export class EditLessonDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}
