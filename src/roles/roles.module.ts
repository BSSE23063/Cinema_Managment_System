import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports:[TypeOrmModule.forFeature([Role]),
  BlacklistModule
],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService],
})
export class RolesModule {}
