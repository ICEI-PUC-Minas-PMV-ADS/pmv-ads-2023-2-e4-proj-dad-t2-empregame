import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHardskillDto {
    @ApiProperty()
    @IsString()
    nome: string;
}
