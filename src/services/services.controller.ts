import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('services')
@UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseGuards()
  findAll() {
    return this.servicesService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Get(':id/reviews')
  findServiceReviews(@Param('id') id: string) {
    return this.servicesService.findServiceReviews(id);
  }
}
