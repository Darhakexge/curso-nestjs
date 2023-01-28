import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
    #brands: Brand[];

    create(createBrandDto: CreateBrandDto): Brand {
        const brand: Brand = {
            id: uuid(),
            name: createBrandDto.name,
            createdAt: new Date().getTime(),
        };

        this.#brands.push(brand);

        return brand;
    }

    findAll() {
        return this.#brands;
    }

    findOne(id: string): Brand {
        const brand = this.#brands.find((brand) => brand.id === id);

        if (!brand) {
            throw new NotFoundException(`Brand with id ${id} not found`);
        }

        return brand;
    }

    update(id: string, updateBrandDto: UpdateBrandDto) {
        let brandDB = this.findOne(id);

        this.#brands = this.#brands.map((brand: Brand) => {
            if (brand.id === id) {
                brandDB = { ...brandDB, ...updateBrandDto };
                brandDB.updatedAt = new Date().getTime();

                return brandDB;
            }

            return brand;
        });
    }

    remove(id: string) {
        this.#brands = this.#brands.filter((brand) => brand.id !== id);
    }

    seed(brands: Brand[]) {
        this.#brands = brands;
    }
}
