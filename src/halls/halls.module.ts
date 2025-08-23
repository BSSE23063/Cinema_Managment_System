import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hall } from './entities/hall.entity';
import { BlacklistModule } from 'src/blacklist/blacklist.module';


@Module({
  imports:[TypeOrmModule.forFeature([Hall]),BlacklistModule],
  controllers: [HallsController],
  providers: [HallsService],
  exports:[HallsService],
})
export class HallsModule {}
