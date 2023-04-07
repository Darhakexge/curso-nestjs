import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from '../pokemon/entities/pokemon.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
    controllers: [SeedController],
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: Pokemon.name,
                schema: PokemonSchema,
            },
        ]),
    ],
    providers: [SeedService],
})
export class SeedModule {}
