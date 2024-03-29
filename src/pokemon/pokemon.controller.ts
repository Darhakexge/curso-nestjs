import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/PaginationDto.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.pokemonService.findAll(paginationDto);
    }

    @Get(':term')
    findOne(@Param('term') id: string) {
        return this.pokemonService.findOne(id);
    }

    @Patch(':term')
    update(
        @Param('term') term: string,
        @Body() updatePokemonDto: UpdatePokemonDto,
    ) {
        return this.pokemonService.update(term, updatePokemonDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.pokemonService.remove(id);
    }
}
