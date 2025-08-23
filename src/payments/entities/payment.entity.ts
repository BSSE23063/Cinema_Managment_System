import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar', length: 20 })
  card_number: string;

  @Column({ type: 'varchar', length: 5 })
  expiry: string;

  @Column({ type: 'varchar', length: 4 })
  cvv: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paid_at: Date;

  
  @OneToOne(() => Booking, (booking) => booking.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  
  @OneToOne(() => FoodOrder, (foodOrder) => foodOrder.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food_order_id' })
  foodOrder: FoodOrder;
}
