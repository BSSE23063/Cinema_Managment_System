import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { HallsModule } from './halls/halls.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';

import { MovieModule } from './movie/movie.module';
import { FoodOrderModule } from './food_order/food_order.module';
import { FoodInventoryModule } from './food_inventory/food_inventory.module';
import { Booking } from './bookings/entities/booking.entity';
import { Hall } from './halls/entities/hall.entity';
import { Movie } from './movie/entities/movie.entity';
import { Payment } from './payments/entities/payment.entity';

import { FoodInventory } from './food_inventory/entities/food_inventory.entity';
import { FoodOrder } from './food_order/entities/food_order.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { Blacklist } from './blacklist/entities/blacklist.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD')?.toString(),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
         
        entities: [
          User,
          Booking,
          Hall,
          Movie,
          Payment,
          Role,
          FoodInventory,
          FoodOrder,
          Blacklist
        ],
      }),
    }),
    UsersModule,
    HallsModule,
    BookingsModule,
    PaymentsModule,

    MovieModule,
    FoodOrderModule,
    FoodInventoryModule,
    RolesModule,
    AuthModule,
    BlacklistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
