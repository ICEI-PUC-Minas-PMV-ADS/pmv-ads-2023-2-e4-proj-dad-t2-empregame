import { ApiProperty } from "@nestjs/swagger";

export class Hardskill {
   @ApiProperty()
   id: number;
   
   @ApiProperty()
   created_at: Date;

   @ApiProperty()
   nome: string;
}
