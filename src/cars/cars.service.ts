import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Car from './interfaces/car.interface';

@Injectable()
export class CarsService {
    #cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    findAll(): Car[] {
        return this.#cars;
    }

    findOneById(id: string): Car {
        const car = this.#cars.find((car) => car.id === id);

        if (typeof car === 'undefined') {
            throw new NotFoundException(`Car with ${id} was not found.`);
        }

        return car;
    }
}
