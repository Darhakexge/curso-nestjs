import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { Car } from './car.interface';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOneById(id);
    }

    @Post()
    create(@Body() body: Car) {
        return {
            body,
        };
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Car) {
        return {
            body,
        };
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id,
        };
    }
}
