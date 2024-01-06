import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser, IUser } from '@app/common';
import { JwtAuthGuard } from '../../src/auth/guards';
import mongoose from 'mongoose';

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

  @Get(':id')
  async findOne(@Param('id') bookingId: string) {
    return await this.bookingsService.findOne({ _id: new mongoose.Types.ObjectId(bookingId) });
  }
}
