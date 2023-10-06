import { ApiProperty } from '@nestjs/swagger';

export class AppResponse<T = unknown> {
    @ApiProperty()
    public readonly page_number?: number;

    @ApiProperty()
    public readonly page_limit?: number;

    @ApiProperty()
    public readonly total_count?: number;

    // response de qualquer coisa, sempre deve ser passado dentro de data
    @ApiProperty()
    public readonly data: T;

    constructor(
        data: T,
        pagination?: {
            page_number: number;
            page_limit: number;
            total_count: number;
        },
    ) {
        this.page_number = pagination?.page_number;
        this.page_limit = pagination?.page_limit;
        this.total_count = pagination?.total_count;
        this.data = data || null;
    }
}
