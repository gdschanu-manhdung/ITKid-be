import { ApiProperty } from '@nestjs/swagger'
import { FundInEnum } from 'src/utils/constants'

export class FundInDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    amount: number
}
