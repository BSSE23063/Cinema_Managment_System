import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { Hall } from 'src/halls/entities/hall.entity';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  ticket_quantity: number;

  @ManyToOne(() => User, (user) => user.bookings, { eager: true,onDelete:'CASCADE',cascade:true })
  @JoinColumn({
    name: 'user_id',
    
  })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.bookings, {
    eager: true,
    onDelete: 'CASCADE', // ensures child row is deleted if parent movie is deleted
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Hall, (hall) => hall.bookings, {eager: true,onDelete:'CASCADE',cascade:true })
  @JoinColumn({
    name: 'hall_id',
  })
  hall: Hall;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.booking, {
    cascade: true,
  })
  foodOrders: FoodOrder[];

  @OneToOne(() => Payment, (payment) => payment.booking, { cascade: true })
  payment: Payment;
}
