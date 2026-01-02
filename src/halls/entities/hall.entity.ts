import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Show } from 'src/shows/entities/show.entity'; // assuming you have a Show entity

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  hall_no: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column()
  price: number;

  // ✅ One hall can have many bookings
  @OneToMany(() => Booking, (booking) => booking.hall)
  bookings: Booking[];

  // ✅ One hall can have many shows
  @OneToMany(() => Show, (show) => show.hall, { cascade: true })
  shows: Show[];
}
