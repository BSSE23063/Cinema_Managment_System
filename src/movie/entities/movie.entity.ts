import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Show } from 'src/shows/entities/show.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  genre: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @OneToMany(() => Booking, (booking) => booking.movie, {
    cascade: true, // optional: cascades insert/update
    onDelete: 'CASCADE', // when a movie is deleted → delete its bookings
  })
  bookings: Booking[];

   @OneToMany(() => Show, (show) => show.movie, { cascade: true })
  shows: Show[];
}
