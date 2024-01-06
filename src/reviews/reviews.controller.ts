import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../../src/auth/guards';
import { CurrentUser, IUser } from '@app/common';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@CurrentUser() user: IUser, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(user, createReviewDto);
  }

  @Get()
  findAll(@CurrentUser() user: IUser) {
    return this.reviewsService.findAll({ userId: user._id });
  }
}
