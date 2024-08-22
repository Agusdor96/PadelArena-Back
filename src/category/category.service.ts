import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from "../data.json";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ){}

  async findAllCategories(){
    return await this.categoryRepository.find()
  }

async precargaCategorias(){
  for(const item of data){
    const exist = await this.categoryRepository.findOne({where: {name: item.name}});
    if(!exist){
      await this.categoryRepository.save(item);
      return (`categorias cargadas correctamente`);
    }else{
      throw {message: `categoria ${item.name} ya existe, continuando precarga`}
    }
  }
}

}
