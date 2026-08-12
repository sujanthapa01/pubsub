import { IsString, IsNotEmpty, MaxLength } from "class-validator"

export class CreateQuoteDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(240)
    quote!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    author!: string;
}