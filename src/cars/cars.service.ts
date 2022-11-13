import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './car.interface';

@Injectable()
export class CarsService {
    #cars: Car[] = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 1,
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    findAll(): Car[] {
        return this.#cars;
    }

    findOneById(id: number): Car {
        const car = this.#cars.find((car) => car.id === id);

        if (typeof car === 'undefined') {
            throw new NotFoundException(`Car with ${id} was not found.`);
        }

        return car;
    }
}
