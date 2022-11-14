import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

export default class UpdateCarDto {
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;
}
