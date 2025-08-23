
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]),BlacklistModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports:[MovieService]
})
export class MovieModule {}
