import { Controller, Get} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCategory } from '../decorators/SwaggerDecorators/Category.decorator';

@ApiTags("CATEGORIES")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @SwaggerCategory()
  getAllCategories() {
      return this.categoryService.findAllCategories()
  }
}
