import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
 RolesModule,
 BlacklistModule
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
