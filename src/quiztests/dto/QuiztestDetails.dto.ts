import { ApiProperty } from '@nestjs/swagger'

export class QuiztestDetailsDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    question: string

    @ApiProperty()
    answer_1: string

    @ApiProperty()
    answer_2: string

    @ApiProperty()
    answer_3: string

    @ApiProperty()
    answer_4: string

    @ApiProperty()
    true_answer: string
}
