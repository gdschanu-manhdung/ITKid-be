import { ApiProperty } from '@nestjs/swagger'

export class EditCategoryDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}
