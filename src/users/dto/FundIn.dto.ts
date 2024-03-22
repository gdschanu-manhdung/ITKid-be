import { ApiProperty } from '@nestjs/swagger'

export class FundInDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    amount: number

    @ApiProperty()
    code: string
}
