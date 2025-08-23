import { Test, TestingModule } from '@nestjs/testing';
import { FoodInventoryController } from './food_inventory.controller';
import { FoodInventoryService } from './food_inventory.service';

describe('FoodInventoryController', () => {
  let controller: FoodInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodInventoryController],
      providers: [FoodInventoryService],
    }).compile();

    controller = module.get<FoodInventoryController>(FoodInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
