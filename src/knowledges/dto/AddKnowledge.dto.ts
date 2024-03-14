import { ApiProperty } from '@nestjs/swagger'

export class AddKnowledgeDto {
    @ApiProperty()
    lessonId: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string
}
