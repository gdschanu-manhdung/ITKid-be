import { ApiProperty } from '@nestjs/swagger'

export class AddCategoryDto {
    @ApiProperty()
    name: string
}
