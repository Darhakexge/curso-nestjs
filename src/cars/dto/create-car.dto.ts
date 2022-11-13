import { IsString, MinLength } from 'class-validator';

export default class CreateCarDto {
    @IsString()
    readonly brand: string;

    @IsString()
    @MinLength(3)
    readonly model: string;
}
