import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.merchantsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.merchantsService.findById(id);
  }

  @Get(':id/services')
  @UseGuards(JwtAuthGuard)
  async findMerchantServices(@Param('id') id: string) {
    return await this.merchantsService.findMerchantServices(id);
  }
}
