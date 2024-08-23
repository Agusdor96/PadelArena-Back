import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from "../seed/categories.json";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ){}

  async findAllCategories(){
    return await this.categoryRepository.find()
  }

  async preloadCategories(){
    const findCategories = await this.categoryRepository.find()
    if(findCategories.length > 0){
      return {message: "Las categorias ya estan cargadas en la Base de datos"}
    }
    for(const item of data){
      const exist = await this.categoryRepository.findOne({where: {name: item.name}});
      if(!exist){
        await this.categoryRepository.save(item);
      }
    }
    return {message: "Categorias cargadas"}
  }

}
