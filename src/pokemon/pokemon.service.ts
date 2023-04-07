import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/PaginationDto.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
    private readonly pokemonModel: Model<Pokemon>;

    constructor(@InjectModel(Pokemon.name) pokemonModel: Model<Pokemon>) {
        this.pokemonModel = pokemonModel;
    }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        try {
            const pokemon = await this.pokemonModel.create(createPokemonDto);

            return pokemon;
        } catch (error) {
            if (error.code === 11000) {
                const [key, value] = Object.entries(error.keyValue)[0];
                throw new BadRequestException(
                    `The Pokémon with ${value} ${key} already exists`,
                );
            }

            throw new InternalServerErrorException('Server error');
        }
    }

    findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.pokemonModel
            .find()
            .limit(limit)
            .skip(offset)
            .sort({ nationalNumber: 1 });
    }

    async findOne(term: string): Promise<Pokemon> {
        let pokemon: Pokemon | null = null;

        if (!isNaN(+term)) {
            pokemon = await this.pokemonModel.findOne({
                nationalNumber: term,
            });
        }

        if (!pokemon && isValidObjectId(term)) {
            pokemon = await this.pokemonModel.findById(term);
        }

        if (!pokemon) {
            pokemon = await this.pokemonModel.findOne({ name: term });
        }

        if (!pokemon) {
            throw new NotFoundException('The Pokémon do not exists');
        }

        return pokemon;
    }

    async update(
        term: string,
        updatePokemonDto: UpdatePokemonDto,
    ) /* : Promise<Pokemon> */ {
        const pokemon = await this.findOne(term);

        if (updatePokemonDto.name) {
            updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
        }

        return { ...pokemon.toJSON(), ...updatePokemonDto };
    }

    async remove(id: string): Promise<null> {
        return await this.pokemonModel.findByIdAndDelete(id);
    }
}
