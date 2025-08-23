import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodOrderService } from './food_order.service';
import { FoodOrderController } from './food_order.controller';
import { FoodOrder } from './entities/food_order.entity';

import { FoodInventoryModule } from 'src/food_inventory/food_inventory.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodOrder]),
    FoodInventoryModule, 
    BookingsModule, 
    BlacklistModule     
  ],
  controllers: [FoodOrderController],
  providers: [FoodOrderService],
  exports: [FoodOrderService],
})
export class FoodOrderModule {}
