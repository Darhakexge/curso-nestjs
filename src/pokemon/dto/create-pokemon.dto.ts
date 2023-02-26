import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    nationalNumber: number;

    @IsString()
    @MinLength(3)
    name: string;
}
