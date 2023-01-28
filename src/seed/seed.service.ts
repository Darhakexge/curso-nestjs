import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {
    readonly #carsService: CarsService;
    readonly #brandsService: BrandsService;

    constructor(carsService: CarsService, brandsService: BrandsService) {
        this.#carsService = carsService;
        this.#brandsService = brandsService;
    }

    populateDB() {
        this.#carsService.seed(CARS_SEED);
        this.#brandsService.seed(BRAND_SEED);

        return `Sedd excecuted`;
    }
}
