import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('merchants')
@UseGuards(JwtAuthGuard)
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  async findAll() {
    return await this.merchantsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.merchantsService.findById(id);
  }

  @Get(':id/services')
  async findMerchantServices(@Param('id') id: string) {
    return await this.merchantsService.findMerchantServices(id);
  }
}
