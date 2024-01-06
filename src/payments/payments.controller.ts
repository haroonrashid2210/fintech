import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CurrentUser, IUser } from '@app/common';
import { JwtAuthGuard } from '../../src/auth/guards';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@CurrentUser() user: IUser, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(user, createPaymentDto);
  }

  @Get()
  findAll(@CurrentUser() user: IUser) {
    return this.paymentsService.findAll(user);
  }
}
