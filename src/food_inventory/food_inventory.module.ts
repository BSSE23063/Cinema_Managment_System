import { Module } from '@nestjs/common';
import { FoodInventoryService } from './food_inventory.service';
import { FoodInventoryController } from './food_inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodInventory } from './entities/food_inventory.entity';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports:[TypeOrmModule.forFeature([FoodInventory]),BlacklistModule],
  controllers: [FoodInventoryController],
  providers: [FoodInventoryService],
  exports:[FoodInventoryService],
})
export class FoodInventoryModule {}
