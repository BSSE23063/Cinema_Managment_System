import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  hall_no: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 10 })
  seat_no: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, (booking) => booking.hall)
  bookings: Booking[];
}
