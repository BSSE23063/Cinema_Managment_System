import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 20 })
  card_number: string;

  @Column({ type: 'varchar', length: 5 })
  expiry: string; // format MM/YY

  @Column({ type: 'varchar', length: 4 })
  cvv: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paid_at: Date;

  // ✅ Optional relation with Booking (CASCADE delete)
  @OneToOne(() => Booking, (booking) => booking.payment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;

  // ✅ Optional relation with FoodOrder (CASCADE delete)
  @OneToOne(() => FoodOrder, (foodOrder) => foodOrder.payment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'food_order_id' })
  foodOrder?: FoodOrder;
}
