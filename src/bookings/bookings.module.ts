import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { MovieModule } from 'src/movie/movie.module';
import { UsersModule } from 'src/users/users.module';
import { HallsModule } from 'src/halls/halls.module';
import { FoodOrderModule } from 'src/food_order/food_order.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports:[TypeOrmModule.forFeature([Booking])
,MovieModule
,UsersModule,
HallsModule,
BlacklistModule
],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports:[BookingsService],
})
export class BookingsModule {}
