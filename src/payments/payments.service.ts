import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { FoodOrderService } from 'src/food_order/food_order.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { Booking } from 'src/bookings/entities/booking.entity';
import { FoodOrder } from 'src/food_order/entities/food_order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly bookingsService: BookingsService,
    private readonly foodOrderService: FoodOrderService,
  ) {}

async create(createPaymentDto: CreatePaymentDto) {
  const { booking_id, food_order_id, card_number, expiry, cvv, paid_at } = createPaymentDto;

  if (!booking_id && !food_order_id) {
    throw new BadRequestException(
      'Either booking_id or food_order_id must be provided.',
    );    
  }

  let totalAmount = 0;
  let booking: Booking | undefined = undefined;
  let foodOrder: FoodOrder | undefined = undefined;

  // Booking-based payment
  if (booking_id) {
    booking = await this.bookingsService.findOne(booking_id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${booking_id} not found`);
    }
    if (!booking.hall?.price) {
      throw new NotFoundException(`Booking with ID ${booking_id} has no hall price`);
    }
    totalAmount += booking.hall.price * booking.ticket_quantity;
  }

  // Food-order-based payment
  if (food_order_id) {
    foodOrder = await this.foodOrderService.findOne(food_order_id);
    if (!foodOrder) {
      throw new NotFoundException(`Food order with ID ${food_order_id} not found`);
    }
    totalAmount += foodOrder.amount;
  }

  // Explicitly create payment object
  const paymentData: Partial<Payment> = {
    card_number,
    expiry,
    cvv,
    paid_at: new Date(paid_at),
    amount: totalAmount,
    booking,
    foodOrder,
  };

  const payment = this.paymentRepository.create(paymentData);

  return await this.paymentRepository.save(payment);
}


  async findAll() {
    return await this.paymentRepository.find({
      relations: ['booking', 'foodOrder'],
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['booking', 'foodOrder'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return { message: `Payment with ID ${id} deleted successfully` };
  }
}
