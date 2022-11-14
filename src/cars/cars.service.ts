import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import CreateCarDto from './dto/create-car.dto';
import UpdateCarDto from './dto/update-car.dto';
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

    create(createCarDto: CreateCarDto): Car {
        const car: Car = {
            id: uuid(),
            ...createCarDto,
        };

        this.#cars.push(car);

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto): Car {
        let carDB: Car = this.findOneById(id);

        this.#cars = this.#cars.map((car) => {
            if (carDB.id === car.id) {
                carDB = { ...car, ...updateCarDto, id };
                return carDB;
            }

            return car;
        });

        return carDB;
    }

    delete(id: string) {
        const carDB = this.findOneById(id);

        this.#cars = this.#cars.filter((car) => car.id !== carDB.id);
    }
}
