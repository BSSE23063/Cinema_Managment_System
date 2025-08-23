import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';

@Entity('food_inventory')
export class FoodInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  item: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  
  @ManyToMany(() => FoodOrder, (order) => order.foodItems)
  orders: FoodOrder[];
}
