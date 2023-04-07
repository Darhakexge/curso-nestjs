import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, firstValueFrom } from 'rxjs';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeapiResponse } from './interfaces/PokeapiResponse';

@Injectable()
export class SeedService {
    private readonly pokemonModel: Model<Pokemon>;

    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Pokemon.name) pokemonModel: Model<Pokemon>,
    ) {
        this.pokemonModel = pokemonModel;
    }

    async executeSeed(): Promise<string> {
        await this.pokemonModel.deleteMany({});

        const { data } = await firstValueFrom(
            this.httpService
                .get<PokeapiResponse>(
                    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        console.error(error.response?.data);
                        throw 'An error happened!';
                    }),
                ),
        );

        const pokemonBulk: CreatePokemonDto[] = data.results.map(
            ({ name, url }) => {
                const segments = url.split('/');
                const nationalNumber: number = parseInt(
                    segments[segments.length - 2],
                );

                return {
                    name,
                    nationalNumber,
                };
            },
        );

        await this.pokemonModel.insertMany(pokemonBulk);

        return 'Seed executed succesfully';
    }
}
