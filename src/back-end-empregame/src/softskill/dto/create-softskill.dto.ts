import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSoftskillDto {
    @ApiProperty()
    @IsString()
    nome: string;
}
