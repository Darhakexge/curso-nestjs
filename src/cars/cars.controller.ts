import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import Car from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    create(@Body() body: Car) {
        return {
            body,
        };
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: Car,
    ) {
        return {
            body,
        };
    }

    @Delete(':id')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return {
            id,
        };
    }
}
