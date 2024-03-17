import { ApiProperty } from '@nestjs/swagger'

export class EditKnowledgeDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    image: string
}
