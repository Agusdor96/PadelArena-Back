import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';

@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Post()
  create(@Body() createFixtureDto: CreateFixtureDto) {
    return this.fixtureService.create(createFixtureDto);
  }

  @Get()
  findAll() {
    return this.fixtureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fixtureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFixtureDto: UpdateFixtureDto) {
    return this.fixtureService.update(+id, updateFixtureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fixtureService.remove(+id);
  }
}
