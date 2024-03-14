import { ApiProperty } from '@nestjs/swagger'

export class QuiztwoDetailsDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    question: string

    @ApiProperty()
    answer_1: string

    @ApiProperty()
    answer_2: string

    @ApiProperty()
    true_answer: string
}
