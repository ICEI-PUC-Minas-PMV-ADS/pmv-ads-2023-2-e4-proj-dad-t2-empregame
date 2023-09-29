import { ApiProperty } from "@nestjs/swagger";

export class Softskill {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    created_at: Date;
 
    @ApiProperty()
    nome: string;
}
