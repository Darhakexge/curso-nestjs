import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
    #cars = ['Toyota', 'Honda', 'Jeep'];

    @Get()
    getAllCars() {
        return this.#cars;
    }

    @Get(':id')
    getCarById(@Param('id') id: number) {
        return this.#cars[id];
    }
}
