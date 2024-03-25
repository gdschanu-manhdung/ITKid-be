import { ApiProperty } from '@nestjs/swagger'

export class SearchCategoryDto {
    @ApiProperty()
    searchQuery?: string
}
