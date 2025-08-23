import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { BookingsModule } from 'src/bookings/bookings.module';
import { FoodOrderModule } from 'src/food_order/food_order.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]), 
    BookingsModule, 
    FoodOrderModule,
    BlacklistModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService], 
})
export class PaymentsModule {}
