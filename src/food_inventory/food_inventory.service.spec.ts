import { Test, TestingModule } from '@nestjs/testing';
import { FoodInventoryService } from './food_inventory.service';

describe('FoodInventoryService', () => {
  let service: FoodInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodInventoryService],
    }).compile();

    service = module.get<FoodInventoryService>(FoodInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
