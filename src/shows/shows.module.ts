import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { Show } from './entities/show.entity';
import { Hall } from 'src/halls/entities/hall.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Hall, Movie])],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
