import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Hall } from 'src/halls/entities/hall.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNo: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

   @ManyToOne(()=>Role,(Role)=>Role.users)
   @JoinColumn({
    name:"role_id"
   })
   role:Role

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

 

}
