import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { FoodOrderService } from 'src/food_order/food_order.service';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';
import { BookingsService } from 'src/bookings/bookings.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly bookingsService:BookingsService,

    private readonly foodOrderService:FoodOrderService,

  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
  const { booking_id, food_order_id, ...rest } = createPaymentDto;

  
  const booking = await this.bookingsService.findOne(booking_id);
  if (!booking) {
    throw new NotFoundException(`Booking with ID ${booking_id} not found`);
  }

  let foodOrders: FoodOrder ;
  let totalAmount = 0;

 
  if (!booking.hall.price) {
    throw new NotFoundException(`Booking with ID ${booking_id} has no hall price`);
  }
  let x=booking.hall.price*booking.ticket_quantity;
  totalAmount += x;

  
  if (food_order_id) {
    foodOrders = await this.foodOrderService.findOne(food_order_id);
    if (!foodOrders) {
      throw new NotFoundException(`Food order with ID ${food_order_id} not found`);
    }
    totalAmount += foodOrders.amount;
  }

  // 4. Create payment with calculated amount
  const payment = this.paymentRepository.create({
    ...rest,
    booking,
    amount: totalAmount,
  });

  return await this.paymentRepository.save(payment);
}



  
  async findAll(){
    return await this.paymentRepository.find({
      relations: ['booking','foodOrder'],
    });
  }

  
  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['booking','foodOrder'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  
  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    Object.assign(payment, updatePaymentDto);

    return await this.paymentRepository.save(payment);
  }

  
  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
