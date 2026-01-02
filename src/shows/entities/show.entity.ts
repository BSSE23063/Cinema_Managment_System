import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hall } from 'src/halls/entities/hall.entity';
import { Movie } from 'src/movie/entities/movie.entity';


@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  // ✅ Relation with Hall
  @ManyToOne(() => Hall, (hall) => hall.shows, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hall_id' })
  hall: Hall;

  // ✅ Relation with Movie
  @ManyToOne(() => Movie, (movie) => movie.shows, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
