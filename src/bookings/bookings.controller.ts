import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser, IUser } from '@app/common';
import { JwtAuthGuard } from '../../src/auth/guards';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@CurrentUser() user: IUser, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(user, createBookingDto);
  }

  @Get()
  findAll(@CurrentUser() user: IUser) {
    return this.bookingsService.findAll(user);
  }
}
