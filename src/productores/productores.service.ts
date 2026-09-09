import { Injectable } from '@nestjs/common';
import { CreateProductoreDto } from './dto/create-productore.dto';
import { UpdateProductoreDto } from './dto/update-productore.dto';

@Injectable()
export class ProductoresService {
  create(createProductoreDto: CreateProductoreDto) {
    return 'This action adds a new productore';
  }

  findAll() {
    return `This action returns all productores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productore`;
  }

  update(id: number, updateProductoreDto: UpdateProductoreDto) {
    return `This action updates a #${id} productore`;
  }

  remove(id: number) {
    return `This action removes a #${id} productore`;
  }
}
