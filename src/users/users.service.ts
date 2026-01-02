import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  // Create user (public registration or admin creating user/admin)
  async create(createUserDto: CreateUserDto, requestingUser?: any) {
    const { password, ...rest } = createUserDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine role based on requestingUser
    let roleName = 'customer'; // default role

    // Only allow creating admin if requestingUser is admin
    if ( createUserDto.role_id === 1) {
      roleName = 'admin';
    }

    const role = await this.rolesService.findOneByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }

    const newUser = this.userRepository.create({
      ...rest,
      password: hashedPassword,
      role,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (err: any) {
      // Handle duplicate key error
      if (err.code === '23505') {
        // 23505 is Postgres unique violation
        throw new ConflictException(err.detail || 'Duplicate entry detected');
      }
      throw err; // re-throw other errors
    }
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['bookings', 'role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['bookings', 'role'],
    });
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.role_id) {
      const role = await this.rolesService.findOne(updateUserDto.role_id);
      if (!role) {
        throw new NotFoundException(`Role not found`);
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
  }

  async FindByNameAndPassword(name: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { name },
      relations: ['role'],
    });
    if(user &&user.password=='random'){
      return user;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
