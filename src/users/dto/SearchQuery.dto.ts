import { ApiProperty } from '@nestjs/swagger'

export class SearchQueryDto {
    @ApiProperty()
    searchQuery?: string
}
