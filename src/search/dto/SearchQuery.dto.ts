import { ApiProperty } from '@nestjs/swagger'

export class SearchQuery {
    @ApiProperty()
    query: string
}
