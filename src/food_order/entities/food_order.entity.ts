import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { FoodInventory } from 'src/food_inventory/entities/food_inventory.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { ArrayMinSize, IsArray } from 'class-validator';

@Entity('food_orders')
export class FoodOrder {
  @PrimaryGeneratedColumn()
  id: number;

 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Booking, (booking) => booking.foodOrders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToMany(() => FoodInventory, (inventory) => inventory.orders, {
    eager: true,
  })
  @JoinTable({
    name: 'food_order_items',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'food_id', referencedColumnName: 'id' },
  })
  foodItems: FoodInventory[];

  @OneToOne(() => Payment, (payment) => payment.foodOrder)
  payment: Payment;


  @IsArray()
  @ArrayMinSize(1)
  @Column('int',{array:true})
  order_quantity: number[];
  
}
