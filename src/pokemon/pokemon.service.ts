import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
    private readonly pokemonModel: Model<Pokemon>;

    constructor(@InjectModel(Pokemon.name) pokemonModel: Model<Pokemon>) {
        this.pokemonModel = pokemonModel;
    }

    async create(createPokemonDto: CreatePokemonDto) /* : Promise<Pokemon> */ {
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

    findAll() {
        return `This action returns all pokemon`;
    }

    findOne(id: number) {
        return `This action returns a #${id} pokemon`;
    }

    update(id: number, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
    }

    remove(id: number) {
        return `This action removes a #${id} pokemon`;
    }
}
